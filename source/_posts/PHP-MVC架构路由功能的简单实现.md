---
title: PHP MVC架构路由功能的简单实现
date: 2018-12-21 01:25:57
tags:
---
目录结构

```
api
  config
    config.php
    router.php
  controller
    HelloWorld.php
  .htaccess
  index.php
```

## apache配置

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php/$1 [L]
```

原本入口的访问路径为``localhost/api/index.php``，而访问更具体的路由时会显示页面不存在，
因此配置``.htaccess``文件的目的是无论访问什么路由，都会走index.php

可以在``index.php``中写下如下代码

```
echo $_SERVER['REQUEST_URI'];
```

访问``localhost/api/hello/world``，可以发现还是会走``index.php``，打印当前路由信息

## 路由配置

配置如下，之后会用到

```
// api/config/router.php

<?php

$config = array(
  '/api/register' => array(
    'file'      => '/controller/Register.php',
    'class_name'=> 'Core\Feature\Register',
    'method'    => 'handleRegister'
  )
);

return $config;
```

## 入口配置 - 关键

```
// api/index.php

<?php

/**
 * MVC路由功能的简单实现
 */

use Core\Feature;

define('APP_PATH', trim(__DIR__));
define('BASE_PATH', dirname(__FILE__));

$root         = $_SERVER['SCRIPT_NAME'];
$request      = $_SERVER['REQUEST_URI'];
$config       = include_once BASE_PATH . '/config/config.php';
$router       = include_once BASE_PATH . '/config/router.php';
$request_path = str_replace('/index.php', '', $_SERVER['PHP_SELF']);

// 判断是否存在路由定义
if (array_key_exists($request_path, $router)) {
  $module_file = BASE_PATH . $router[$request_path]['file'];
  $class_name  = $router[$request_path]['class_name'];
  $method_name = $router[$request_path]['method'];

//  判断是否存在文件
  if (file_exists($module_file)) {
    include($module_file);
    $object_module = new $class_name();

//    判断是否存在方法
    if (method_exists($object_module, $method_name)) {
      if (is_callable(array($object_module, $method_name))) {
        $object_module->$method_name();
      }
    } else {
      die('method not exist');
    }
  } else {
    die('file not exist');
  }
} else {
  die('page not found');
}

?>
```

## 模块例子

```
// api/controller/Register.php

namespace Core\Feature;


class HelloWorld {
  public function handleHelloWorld() {
    echo 'hello world';
  }
}
```