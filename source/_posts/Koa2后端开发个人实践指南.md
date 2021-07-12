---
title: Koa2后端开发个人实践指南
date: 2020-05-17 23:04:45
tags:
  -- Javascript
  -- Node
categories:
  -- 后端
---

这是一篇关于``Koa``库的文章，这是我在学习``Node.js``后端开发过程中摸索出来的比较好的实践方式。

文档: https://koa.bootcss.com/
实践项目: https://github.com/Kevin031/efficiency_plus/tree/master/api


### 为什么是Koa

虽然是``Express``原班人马开发，也是大量使用中间件的形式，但区别还是挺大的。

1. ``Express``是基于``callback``来组合业务逻辑。``callback``有两大硬伤，一是不可组合，二是异常不可捕获。``Express``的中间件模式虽然在一定程度上解决这两个问题，但没法彻底解决。

2. Koa对``async/await``的支持度非常好，代码更清晰简洁

### 如何实现多路由

可以借助``koa-router``库

基本操作

```
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    msg: 'hello world'
  }
})

app.use(router.routes())

app.listen(3000)
```

而复杂项目一般采用MVC架构，可以作以下改造

首先创建一个目录``/routes``
不同功能的路由分别在里面创建文件就可以了，示例如下

```
const Router = require('koa-router')
const controller = require('../controllers/user')
const router = new Router({ prefix: '/api/user' })

router.post('/login', controller.wxLogin)
router.get('/session', controller.session)

module.exports = router
```

最后在入口文件``app.js``中按如下方式挂载路由

```
const route_modules = fs.readdirSync(path.join(__dirname, './routes'))
route_modules.forEach(name => {
  const router = require(path.join(__dirname, `./routes/${name.split('.')[0]}`))
  app.use(router.routes())
})
```

### 如何建立session会话

可以借助``koa-session``库，具体用法参考文档https://www.npmjs.com/package/koa-session

在``app.js``中
```
const session = require('koa-session')

app.keys = ['secret']
app.use(session({
  key: 'USER_SID',
  maxAge: 86400000 * 7
}))
```

在任意``controller``中

```
let _uid = 0

class UserController {
  login () {
    // 只要更改了session属性，就会在响应头中加入Set-Cookie
    ctx.session.is_login = true
    ctx.session.uid++
  }

  session () {
    // 客户端请求头带上Cookie，再次访问session，已经有记录
    ctx.body = {
      is_login: ctx.session.is_login
      uid: ctx.session.uid
    }
  }
}
```

由此，服务就可以根据``cookie``拿到``uid``，不需要数据库单独维护session表

### 如何连接数据库

这里只总结``mysql``的情况，我用的是``mysql``库

```
const mysql = require('mysql')
const config = require('../config')

const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
})

class Database {
  constructor () {
    this.pool = pool
  }

  query (SQL, params) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err.message)
        } else {
          connection.query(SQL, params, (error, result) => {
            if (error) {
              reject(error.message)
            }
            resolve(result)
          })
        }
        connection.release()
      })
    })  
  }
}

module.exports = Database
```

在需要连接数据库的``controller``中，实例化对象即可

```
const database = new Database()

// select
const [record] = await database.query(`SELECT * FROM users WHERE uid='1'`)

// insert
const result = database.query('INSERT INTO users (uid, name, age) VALUES (?,?,?)', ['1', 'Kevin', '23'])
console.log(result.insertId)

// update
database.query(`UPDATE users SET age='24' WHERE uid='1'`)
```
