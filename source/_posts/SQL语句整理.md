---
title: SQL语句整理
date: 2018-11-27 23:16:23
tags: 
  - 数据库
categories:
  - 后端
---

一些最重要的SQL命令

**SELECT** - 从数据库中**提取**数据
**UPDATE** - **更新**数据库中的数据
**DELETE** - 从数据库中**删除**数据
**INSERT INTO** - 向数据库中插入新数据
**CREATE DATABASE** - 创建新数据库
**ALTER DATABASE** - 修改数据库
**CREATE TABLE** - 创建新表
**ALTER TABLE** - 变更（改变）数据库表
**DROP TABLE** - 删除表
**CREATE INDEX** - 创建索引
**DROP INDEX** - 删除索引

# SELECT语句

## 基础语法

1. 从``Websites``表中选取所有记录

```
SELECT * FORM Websites;
```

2. 从``Websites``表中选取``name``和``country``列

```
SELECT name, country FROM Websites;
```

---

## SELECT DISTINCT语句

从``Websites``表的``country``列中选取唯一不同的值（即去掉重复值）

```
SELECT DISTINCT country FROM Websites;
```

---

## WHERE子句

1. 从``Websites``表中选取国家为``CN``的所有纪录

```
SELECT * FROM Websites WHERE country='CN';
```

2. 从``Websites``表中选取``id``为``1``的所有纪录

```
SELECT * FROM Websites Where id=1;
```

---

## 运算符

```
=
<>
>
<
>=
<=
BETWEEN * AND *  // 在某个范围内
LIKE             // 搜索某种模式
IN               // 指定针对列的多个可能值
```

**一些逻辑运算**

1. 同时满足两个条件的值

```
SELECT * FROM emp WHERE sal > 2000 AND sal < 3000;
```

2. 空值判断

```
SELECT * FROM emp WHERE sal IS NULL;
```

3. IN

```
SELECT * FROM exp WHERE sal IN (5000, 3000, 1500);
```

4. LIKE

模糊查询

```
SELECT * FROM emp WHERE sal LIKE 'M%';
```

ps:

**%** - 表示多个字值，``_``下划线表示一个字符
**M%** - 通配符，正则表达式，表示的意思是模糊查询信息为M开头的
**%M%** - 表示查询包含``M``的所有内容
**%M_** - 表示查询``M``在倒数第二位的所有内容

5. 不带比较运算符的WHERE子句

WHERE 子句并不一定带比较运算符，当不带运算符时，会执行一个隐式转换。当 0 时转化为 false，1 转化为 true

```
SELECT studentNO FROM student WHERE 0; // 每一行纪录WHER都返回false
```

---

## AND & OR 运算符

```
SELECT * FROM Websites WHERE country='CN' AND alexa > 50;

SELECT * FROM Websites WHERE country='CN' OR country = 'USA';
```

---

## ORDER BY 关键字

用于对结果集按照一个列或者多个列进行排序

例子：下面的 SQL 语句从``Websites``表中选取所有网站，并按照``alexa``列降序排序

```
SELECT * FROM Website ORDER BY alexa DESC;
```

---

# INSERT INTO语句

主要有两种编写形式

1. 无需指定要插入数据的列名，只需提供被插入的值即可

```
INSERT INTO table_name VALUES (value1, value2, value3, ...);
```

2. 需要制定列名及被插入的值

```
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...)
```

例子：

1. 插入一个新行

```
INSERT INTO Websites (name, url, alexa, country) VALUES ('百度', 'https://www.baidu.com/', '4', 'CN');
```

2. 在指定的列插入数据

```
INSERT INTO Websites (name, url, country) VALUES ('百度', 'https://www.baidu.com/', 'CN');
```

# UPDATE 语句

用于更新表中已存在的纪录

```
UPDATE table_name SET column1=value1, column2=value2... WHERE some_column=some_value
```

例子：

```
UPDATE Websites SET alexa='5000', country='USA' WHERE name='百度'
```

ps: 注意不要省略``WHERE``子句，否则会将表中所有数据的值改写

在 MySQL 中可 以通过设置 sql_safe_updates 这个自带的参数来解决，当该参数开启的情况下，你必须在update 语句后携带 where 条件，否则就会报错

# DELETE 语句

```
DELETE FROM table_name WHERE some_column=some_value
```

ps: 注意不要省略``WHERE``子句，否则表中所有数据将被删除

例子:

```
DELETE FROM Websites WHERE name='百度' AND country='CN'
```