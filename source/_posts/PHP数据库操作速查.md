---
title: PHP数据库操作速查
date: 2018-11-28 23:30:06
tags:
  - 数据库
  - PHP
categories:
  - 后端
---

**mysqli** - MySQLi extension
只针对 MySQL 数据库

**PDO** - (PHP Data Objects)
应用在 12 种不同数据库中

---

首先将数据库的一些配置赋好值

```
$server = 'localhost';
$username = 'username';
$password = 'password';
```

1. mysqli 面向过程

```
// 创建连接
$connect = mysqli_connect($server, $username, $password);

// 检测连接
if (!$connect) {
  die('连接失败' . mysqli_connect_error());
}

echo '连接成功';

// 关闭连接
mysqli_close($connect);
```

---

2. mysqli 面向对象

```
// 创建连接
$connect = new mysqli($server, $username, $password);

// 检测连接
if ($connect->connect_error) {
  die('连接失败' . $connect->connect_error)
}

// 关闭连接
$connect->close();
```

---

3. PDO

```
try {
  $connect = new PDO('mysql:host=$server;', $username, $password);
  echo '连接成功';
} catch (PDOException $e) {
  echo $e->getMessage();
}

// 关闭连接
$connect = null
```

## 创建数据库

```
try {
  $connect = new PDO('mysql:host=$server;', $username, $password);
  echo '连接成功';

  // 设置PDO错误模式为异常
  $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = 'CREATE DATABASE myDatabase';

  $connect->exec($sql);

  echo '数据库创建成功<br>'
} catch (PDOException $e) {
  echo $sql . '<br>' . $e->getMessage();
}
```

使用 PDO 的最大好处是在数据库查询过程出现问题时可以使用异常类来 处理问题。如果 try{ } 代码块出现异常，脚本会停止执行并会跳到第一个 catch(){ } 代码块执行代码。

## 创建数据表

以下代码将创建一个名为``MyGuests``的表

```
CREATE TABLE MyGuests (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(50),
  reg_date TIMESTAMP
);
```

每个表都应该有一个主键，包含唯一的值

一些属性值备注：
**NOT NULL** - 每一行都必须有值(不能为空)
**DEFAULT value** - 设置默认值
**UNSIGNED** - 使用无符号数值类型，0及正数
**AUTO INCREMENT** - 设置mysql字段的值在新增纪录时每次自动增长1
**PRIMARY KEY** - 设置数据表中每条纪录的唯一标识，通常列的PRIMARY KEY设置为ID数值，与AUTO INCREMENT一起使用

接着只需要将以上代码传到``$connect->exec()``中即可

```
$sql = "CREATE TABLE MyGuests (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(50),
  reg_date TIMESTAMP
)";

$connect-exec($sql);
```

## 插入数据

仍然是先写SQL语句

```
INSERT INTO myGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com');
```

完整代码如下

```
$dbname = 'myDatabase';

try {
  $connect = new PDO('mysql:host=$server;dbname=$dbname', $username, $password);
  // 设置PDO错误模式。用于抛出异常
  $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // 定义SQL语句
  $sql = 'INSERT INTO myGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')';

  // 执行操作
  $connect->exec($sql);
  echo '新记录插入成功';

} catch (PDOException $e) {
  echo $sql . '<br>' . $e->getMessage();
}

$connect = null;
```

插入多条记录的情况

```
try{
  // 开始事务
  $connect->beginTransaction();

  // SQL语句
  $connect->exec('INSERT INTO myGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')');
  $connect->exec('INSERT INTO myGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')');
  $connect->exec('INSERT INTO myGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')');

  //提交事务
  $connect->commit();
  echo '新记录插入成功';
} catch (PDOException $e) {
  // 如果执行失败回滚
  $connect->rollback();
  echo $sql . '<br>' . $e->getMessage();
}
```

## 场景模拟

下面开始动手实战，模拟用户注册账号的场景

首先我定义了一个基类
