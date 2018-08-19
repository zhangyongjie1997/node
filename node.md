# node.js

## nodejs理解
- Node 中的 JavaScript
  + EcmaScript
    * 变量
    * 方法
    * 数据类型
    * 内置对象
    * Array
    * Object
    * Date
    * Math
  + 模块系统
    * 在 Node 中没有全局作用域的概念
    * 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
    * require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    * 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
    * 但是某些情况下，模块与模块是需要进行通信的
    * 在每个模块中，都提供了一个对象：`exports`
    * 该对象默认是一个空对象
    * 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中
    * 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象
    * 还有其它的一些规则，具体后面讲，以及如何在项目中去使用这种编程方式，会通过后面的案例来处理
  + 核心模块
    * 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
      - fs 文件操作模块
      - http 网络服务构建模块
      - os 操作系统信息模块
      - path 路径处理模块
      - 。。。。
    * 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
      - `var fs = require('fs')`
- http
  + require
  + 端口号
    * ip 地址定位计算机
    * 端口号定位具体的应用程序
  + Content-Type
    * 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
    * 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
    * 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
  + 通过网络发送文件
    * 发送的并不是文件，本质上来讲发送是文件的内容
    * 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理

- 模块系统
- Node 中的其它的核心模块
- 做一个小管理系统：
  + CRUD
- Express Web 开发框架
  + `npm install express`

## CommonJS
- require加载
- module
- exports
  >exports是module.exports的引用，更改exports的引用会断开exports和module.exports的连接,**最终导出的是module.exports**，
  >exports是module的一个属性
定义模块
```js
exports.xx=yy  //可以，因为这种方式最终修改的是module.exports,相当于module.exports.xx=yy
exports = {aa：bb}  //这样的方式导出后会取不到aa，因为exports与module.exports断开了连接
module.exports = {}  //这种导出方式最好
```
加载模块
```js
let xx = require('url')
console.log(xx) //yy
```
```js
// require 是一个方法
// 它的作用就是用来加载模块的
// 在 Node 中，模块有三种：
//    具名的核心模块，例如 fs、http
//    用户自己编写的文件模块
//      相对路径必须加 ./
//      可以省略后缀名
//      相对路径中的 ./ 不能省略，否则报错
//    在 Node 中，没有全局作用域，只有模块作用域
//      外部访问不到内部
//      内部也访问不到外部
//      默认都是封闭的
//    既然是模块作用域，那如何让模块与模块之间进行通信
//    有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要是为了使用里面的某个成员
//require加载模块的同时会直接执行里面的代码，如果是从缓存中加载就不会执行
//a先require b，c又require b，c就是从缓存中加载
```
- requirejs 加载规则
```js
// 如果是非路径形式的模块标识
// 路径形式的模块：
//  ./ 当前目录，不可省略
//  ../ 上一级目录，不可省略
//  /xxx 几乎不用
//  d:/a/foo.js 几乎不用
//  首位的 / 在这里表示的是当前文件模块所属磁盘根路径
//  .js 后缀名可以省略
// require('./foo.js')

// 核心模块的本质也是文件
// 核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了
// require('fs')
// require('http')

// 第三方模块
// 凡是第三方模块都必须通过 npm 来下载
// 使用的时候就可以通过 require('包名') 的方式来进行加载才可以使用
// 不可能有任何一个第三方包和核心模块的名字是一样的
// 既不是核心模块、也不是路径形式的模块
//    先找到当前文件所处目录中的 node_modules 目录
//    node_modules/art-template
//    node_modules/art-template/package.json 文件
//    node_modules/art-template/package.json 文件中的 main 属性
//    main 属性中就记录了 art-template 的入口模块
//    然后加载使用这个第三方包
//    实际上最终加载的还是文件

//    如果 package.json 文件不存在或者 main 指定的入口模块是也没有
//    则 node 会自动找该目录下的 index.js
//    也就是说 index.js 会作为一个默认备选项
//    
//    如果以上所有任何一个条件都不成立，则会进入上一级目录中的 node_modules 目录查找
//    如果上一级还没有，则继续往上上一级查找
//    。。。
//    如果直到当前磁盘根目录还找不到，最后报错：
//      can not find module xxx
// var template = require('art-template')
// 
// 注意：我们一个项目有且只有一个 node_modules，放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包
// 不会出现有多个 node_modules
// 模块查找机制
//    优先从缓存加载
//    核心模块
//    路径形式的文件模块
//    第三方模块
//      node_modules/art-template/
//      node_modules/art-template/package.json
//      node_modules/art-template/package.json main
//      index.js 备选项
//      进入上一级目录找 node_modules
//      按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx
//    一个项目有且仅有一个 node_modules 而且是存放到项目的根目录
```

## 启动http服务  http模块
```js
var http = require('http');
var url = require('url');
var server = http.createServer(function (request, response) {
var {pathname,query} = url.parse(request.url,true)  //true表示把请求路径中的参数转化成对象
  // http://127.0.0.1:3000/ /
  // http://127.0.0.1:3000/a /a
  // http://127.0.0.1:3000/foo/b /foo/b
  if(pathname == xxx){}  //通过判断请求路径来执行一些操作
  console.log('收到客户端的请求了，请求路径是：' + request.url)

  // response 对象有一个方法：write 可以用来给客户端发送响应数据
  // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
  response.write('hello')
  response.write(' nodejs')

  // 告诉客户端，我的话说完了，你可以呈递给用户了
  response.end()

})

// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息


server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```

## 读写文件  fs模块
```js
let fs = require('fs')
fs.readFile('url',function(err,data){
  if(err){

  }else{}
})
fs.writeFile(path.join(__dirname, 'url'),JSON.stringify(data),callback);
```
- fs.stat读取文件的状态
  fs.stat(path,callback(err,stats));
  - callback有两个参数；err，stats；stats是一个fs.Stats对象(包含文件大小，创建时间，修改时间，是否为目录等)；

- fs.appendFile()以追加的方式写文件
  - 参数(filename,data,[options],callback)
  - ```js
    fs.appendFile(__dirname + '/test.txt', '使用fs.appendFile追加文件内容', function () {
    console.log('追加内容完成');
    });
    ```

- fs.open()打开文件
  - fs.open(filename, flags, [mode], callback);

  - ```js
    /**
    * filename, 必选参数，文件名
    * flags, 操作标识，如"r",读方式打开
    * [mode],权限，如777，表示任何用户读写可执行
    * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
    */
    fs.open(__dirname + '/test.txt', 'r', '0666', function (err, fd) {
      console.log(fd);
    });
    ```

- 创建目录fs.mkdir
  - ```js
    //使用fs.mkdir创建目录
    //fs.mkdir(path, [mode], callback);

    /**
    * path, 被创建目录的完整路径及目录名；
    * [mode], 目录权限，默认0777
    * [callback(err)], 创建完目录回调函数,err错误对象
    */  
    fs.mkdir(__dirname + '/fsDir', function (err) {
      if(err)
        throw err;
      console.log('创建目录成功')
    });
    ```

- 读取目录fs.readdir

  - ```js
    读取目录;
    //使用fs.readdir读取目录，重点其回调函数中files对象
    //fs.readdir(path, callback);

    /**
    * path, 要读取目录的完整路径及目录名；
    * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
    */
    ```

- fs.exists()查看目录是否存在
  - ```js
    //fs.exists(path, callback);
    /**
    * path, 要查看目录/文件的完整路径及名；
    * [callback(exists)], 操作完成回调函数；exists true存在，false表示不存在
    */

    fs.exists(__dirname + '/te', function (exists) {
      var retTxt = exists ? retTxt = '文件存在' : '文件不存在';
      console.log(retTxt);
    });

    ```
## path 路径模块
- path.join
  - path.join()方法可以连接任意多个路径字符串。要连接的多个路径可做为参数传入。path.join()方法在接边路径的同时也会对路径进行规范化。
  ```js
  var path = require('path');
  //合法的字符串连接
  ```

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 连接后

'/foo/bar/baz/asdf'

//不合法的字符串将抛出异常

path.join('foo', {}, 'bar');

// 抛出的异常

TypeError: Arguments to path.join must be strings'

```
    
		path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些	路径逐一进行cd操作
   ```js
      path.resolve('/foo/bar', './baz')
        // 输出结果为
    '/foo/bar/baz'
    path.resolve('/foo/bar', '/tmp/file/')

    // 输出结果为

    '/tmp/file'

    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
    // 当前的工作路径是 /home/itbilu/node，则输出结果为

    '/home/itbilu/node/wwwroot/static_files/gif/image.gif'

```
## http-content-type
```js
// require
// 端口号

var http = require('http')

var server = http.createServer()

server.on('request', function (req, res) {
  // 在服务端默认发送的数据，其实是 utf8 编码的内容
  // 但是浏览器不知道你是 utf8 编码的内容
  // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是 gbk
  // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
  // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  // res.end('hello 世界')

  var url = req.url

  if (url === '/plain') {
    // text/plain 就是普通文本
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 世界')
  } else if (url === '/html') {
    // 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello html <a href="">点我</a></p>')
  }
})

server.listen(3000, function () {
  console.log('Server is running...')
})
```
- 获取post请求提交的数据 body-parser
```js
//安装body-parser
//import body-parser

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//引入body-parser

app.use(bodyParser.urlendcode({extended:false}))
app.use(bodeParser.json())
app.use(function(req,res){
req.body;   //引入body-parser后，req会多处一个body属性
})
```

  


## 服务端渲染
- 服务端渲染
  + 说白了就是在服务端使用模板引擎
  + 模板引擎最早诞生于服务端，后来才发展到了前端
- 服务端渲染和客户端渲染的区别
  + 客户端渲染不利于 SEO 搜索引擎优化
  + 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  + 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
  + 而是两者结合来做的
  + 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
  + 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染

# express 框架
```js
//引入
let express = require('express')
//启动http服务
let app = express()  //相当于http.createServer
let bodyParser = require('body-parser')  //引入body-parser中间件

//express处理静态资源请求
app.use('/node_modules/', express.static('./node_modules/'))  
app.use('/public/', express.static('./public/'))  //当请求/public/路径时，映射到./public/目录

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

ap.get('url',function(req,res){})  //处理get请求
app.use(router){})//根据请求路径处理业务  路由
app.listen(3000,function(){})
```
## express-crud

- 起步
  + 初始化
  + 模板处理

- 路由设计

  | 请求方法 | 请求路径 | get参数 | post参数 | 作用 | 备注 |
  | -------- | -------- | ------- | -------- | ---- | ---- |
  |          |          |         |          |      |      |

  

## 路由模块提取

- 模块化  创建router.js
  1. let router = express.Router()  //创建路由容器
  2. router.get/post('url',function(req,rs){})  //把路由都挂载到路由容器上
  3.  module.exports  = router //把router导出
- app.js导入router   //入口文件导入
  1. let router = require('./router.js')
  2. app.use(router)

# app.js

> **入口文件**

- 职责
  1. 创建服务
  2. 服务相关的配置
     1. 模板引擎
     2. body-parser
     3. 提供静态资源服务
  3. 挂载路由
  4. 监听端口启动服务

# 封装异步API  readfile 异步回调

```js
function a(){
    let data = '';
    setTimeout(function(){
        data = '1';
    },0)
    return data;
}
console.log(a())  //''
```

> **如果要获取一个函数中异步操作的结果，就必须通过通过回调函数来获取**

```js
//改造上面的代码
function a(callback){
    let data = '';
    setTimeout(function(){
        data = '1';
        callback(data);
    },0)
}
a(function(data){
    console.log(data)   //'1'
})
```

- 举例   读取学生json文件

  ```js
  //student-api.js
  exports.find = function(callback){
      fs.readFile('./student.json',function(err,data){
          if(err){
              return callback(err)
          }else{
              callback(null,data)
          }
      });
  }
  //调用
  find(function(err,data){
      if(err){
          return;
      }
      do something....
  })
  ```

  

# MongoDB

> 存储的是集合，键值对

- 开启和关闭

  - mongod默认使用执行mongod命令福所在的盘符根目录下的/data/db文件夹作为自己的数据储存目录

  - 第一次执行需要手动创建一个/data/db文件夹

  - 修改默认的储存目录

    ```shell
    mongod --adpath=数据储存目录路径
    ```

  - 命令行输入mongod回车开启服务，ctrl+c或者关闭cmd来停止服务

- 连接数据库

  命令行输入mongo回车

  ```shell
  # 默认连接本机的mongodb服务
  mongo
  ```

- 退出

  ```shell
  # 在连接状态输入exit退出
  exit
  ```

  

- 基本操作

  ```shell
  show dbs  		# 查看所有数据库
  db        		# 查看当前操作的数据库
  use 数据库名 	 # 切换到指定的数据库，如果没有就会新建
  db.students.insertOne({"name":"Jack"})  #在当前数据库的students表(集合)插入一条数据
  # 刚刚新建数据库时，show dbs无法查询到，当在数据库中插入一条数据后，数据库就会被创建，show dbs就能看到了
  show collections # 查看当前数据库中的所有集合
  db.students.find() # 查询students集合中的所有数据
  ```

  

- 在node中使用MongoDB

  1. 使用官方的mongodb包

  2. 使用第三方mongoose，基于官方的mongodb封装

     

- mongoose使用

```js
//引入mongoose包
const mongoose = require('mongoose');
//连接mongodb数据库
mongoose.connect('mongodb://localhost/test');
//创建一个模型，就是在设计数据库
//mongodb非常灵活，在代码中设计数据库
const Cat = mongoose.model('Cat', { name: String });
//实例化一个cat - kitty
const kitty = new Cat({ name: 'Zildjian' });
//持久化存储kitty
kitty.save().then((err) =>{
    if(err){
        
    }else{
        
    }
});
```

