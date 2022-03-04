const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const config = require('./config.json')
const { Command } = require('commander')

const POST_PATH = path.resolve(__dirname, '../source/_posts')

let dbConfig = config.database

function parseContentInfo (content) {
  const matchHeader = content.match(/^---[\s\S]*?---/)
  let output = {}
  output.body = content
  if (matchHeader && matchHeader[0]) {
    output.body = content.replace(matchHeader[0], '')
    let arr = matchHeader[0].split('\n')
      .map(item => {
        return item.replace('\r', '').trim()
      })
      .filter(item => item !== '---')
    arr.forEach((item, index) => {
      if (item.startsWith('-')) {
        let i = index - 1
        while (arr[i].startsWith('-') && i > 0) {
          i--
        }
        if (!arr[i].endsWith(':')) {
          arr[i] += ','
        }
        arr[i] += item.replace('-', '').trim()
      }
    })
    arr = arr.filter(item => {
      return !item.startsWith('-') && item.indexOf(':') > -1
    })
    arr.forEach(str => {
      const match = str.match(/(\w+):(.+)/)
      if (match && match[2]) {
        let [_, key, value] = match
        output[key] = value.indexOf(',') > 0 || ['tags', 'categories'].includes(key) ? value.split(',').map(item => item.trim()) : value.trim()
      }
    })

    // 生成额外字段
    output.id = new Date(output.date).getTime()
  }
  return output
}

function insertMySQL (data) {
  const connection = mysql.createConnection({
    ...dbConfig,
    database: 'kevin-blog'
  })
  connection.connect()
  try {
    connection.beginTransaction(err => {
      if (err) throw err
      let tags = []
      let categories = []
      let articles = []
      data.forEach(item => {
        item.tags = item.tags || []
        item.categories = item.categories || []
        item.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push({
              name: tag
            })
          }
        })
        item.categories.forEach(cate => {
          if (!categories.includes(cate)) {
            categories.push({
              name: cate
            })
          }
        })
        articles.push(item)
      })
      tags.forEach(tag => {
        connection.query(`SELECT * FROM tags WHERE name=?`, [tag], (err, results) => {
          if (err) throw err
          if (!results.length) {
            connection.query(`INSERT INTO tags (name) VALUES (?)`, [tag], err => {
              if (err) throw err
            })
          }
        })
      })
      categories.forEach(category => {
        connection.query(`SELECT * FROM categories WHERE name=?`, [category], (err, results) => {
          if (err) throw err
          if (results[0]) {
            category.id = results[0].id
          } else {
            connection.query(`INSERT INTO categories (name) VALUES (?)`, [category], (err, results) => {
              if (err) throw err
              if (results[0]) {
                category.id = results[0].id
              }
            })
          }
        })
      })
      // 文章入库
      articles.forEach(item => {
        connection.query(`SELECT id FROM post WHERE nid=?`, [item.id], (err, results) => {
          if (err) throw err
          if (results[0]) {
            const id = results[0].id
            const column = categories
            connection.query(`UPDATE post SET title=?, body=?, date=?, tags=?, categories=?, column=? WHERE nid=?`, [
              item.title,
              item.body,
              item.date,
              item.tags.join(','),
              item.categories.join(','),
              1,
              id
            ], (err, results) => {
              if (err) throw err
              console.log(results)
            })
          } else {
            connection.query(`INSERT INTO post (title,nid,body,date,tags,categories) VALUES (?,?,?,?,?,?)`, [
              item.title,
              item.id,
              item.body,
              item.date,
              item.tags.join(','),
              item.categories.join(',')
            ], err => {
              if (err) throw err
            })
          }
        })
      })
      connection.commit(err => {
        if (err) throw err
        connection.query(`SELECT id FROM post`, (err, results) => {
          if (err) throw err
          console.log(`目前共有${results.length}篇文章`)
        })
        connection.end()
      })
    })
  } catch (err) {
    connection.rollback(() => {
      console.error(err)
      connection.end()
    })
  }
}

function start () {
  try {
    const list = fs.readdirSync(POST_PATH)
    console.log(`找到${list.length}篇文章，开始遍历`)
    let postList = []
    list.forEach(name => {
      const content = fs.readFileSync(path.resolve(POST_PATH, name), 'utf-8')
      const data = parseContentInfo(content)
      postList.push(data)
    })
    insertMySQL(postList)
    console.log('入库成功')
  } catch (err) {
    console.error(err)
    process.exit()
  }
}

const program = new Command()

program
  .option('--host [host]', '数据库地址')
  .option('--user [user]', '数据库用户名')
  .option('--password [password]', '数据库密码')

const options = program.opts()

program.parse()

dbConfig = {
  ...dbConfig,
  ...options
}

start()
