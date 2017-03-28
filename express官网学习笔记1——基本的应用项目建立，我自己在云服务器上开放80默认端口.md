###express安装
假设您已经安装了 Node.js，创建目录以保存应用程序，并将其设置为工作目录。

	
	$ mkdir myapp
	$ cd myapp

使用 npm init 命令为应用程序创建 package.json 文件。 有关 package.json 工作方式的更多信息，请参阅 Specifics of npm’s package.json handling。


	$ npm init

此命令提示您输入若干项，例如应用程序的名称和版本。 现在，只需按回车键以接受其中大多数项的缺省值，但以下情况例外：


	entry point: (index.js)

输入 app.js，或者您希望使用的任何主文件名称。如果希望文件名为 index.js，请按回车键以接受建议的缺省文件名。

在 app 目录中安装 Express，然后将其保存在依赖项列表中。例如：


	$ npm install express --save

要暂时安装 Express 而不将其添加到依赖项列表中，请省略 --save 选项：


	$ npm install express

采用 --save 选项安装的 Node 模块已添加到 package.json 文件中的 dependencies 列表。 今后运行 app 目录中的 npm install 将自动安装依赖项列表中的模块。

###第一个app

首先创建名为 myapp 的目录，切换到此目录，然后运行 npm init。根据安装指南将 express 安装为依赖项。

在 myapp 目录中，创建名为 app.js 的文件，然后添加以下代码：


	var express = require('express');
	var app = express();
	
	app.get('/', function (req, res) {
	  res.send('Hello World!');
	});
	
	app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
	});

应用程序会启动服务器，并在端口 3000 上侦听连接。此应用程序以“Hello World!”响应针对根 URL (/) 或路由的请求。对于其他所有路径，它将以 404 Not Found 进行响应。

req（请求）和 res（响应）与 Node 提供的对象完全相同，所以您可以在不涉及 Express 的情况下调用 req.pipe()、req.on('data', callback) 和要执行的其他任何函数。
使用以下命令运行应用程序：


	$ node app.js

然后，在浏览器中装入 http://localhost:3000/ 以查看输出

###express应用程序生成器
可使用应用程序生成器工具 (express) 快速创建应用程序框架。

使用以下命令安装 express：


	 $ npm install express-generator -g

然后安装依赖项：

	
	$ cd myapp
	$ npm install

在 MacOS 或 Linux 上，采用以下命令运行此应用程序：


	$ DEBUG=myapp:* npm start

在 Windows 上，使用以下命令：


	> set DEBUG=myapp:* & npm start

然后在浏览器中装入 http://localhost:3000/ 以访问此应用程序。

生成的应用程序具有以下目录结构：


	.
	├── app.js
	├── bin
	│   └── www
	├── package.json
	├── public
	│   ├── images
	│   ├── javascripts
	│   └── stylesheets
	│       └── style.css
	├── routes
	│   ├── index.js
	│   └── users.js
	└── views
	    ├── error.pug
	    ├── index.pug
	    └── layout.pug
	
	7 directories, 9 files

###一个简单的Express路由
> 路由是由一个URL(或者叫做路径)和一个特定的HTTP方法(GET,POST等)组成，设计到应用如何响应客户端对某个网站节点的访问。、
> 
> 每个路由都可以有一个或者多个处理器函数，当匹配到路由的时候，这些函数将会被执行
> 
> 路由定义由如下结构组成:app.METHOD(PATH,HANLER) 其中 app是一个express实例， METHOD是一个http请求方式中的一个；PATH是服务器端的路径；HANDLER是当路由匹配到时需要执行的函数.

实例:

	// 对网站首页的访问返回 "Hello World!" 字样
	app.get('/', function (req, res) {
	  res.send('Hello World!');
	});
	
	// 网站首页接受 POST 请求
	app.post('/', function (req, res) {
	  res.send('Got a POST request');
	});
	
	// /user 节点接受 PUT 请求
	app.put('/user', function (req, res) {
	  res.send('Got a PUT request at /user');
	});
	
	// /user 节点接受 DELETE 请求
	app.delete('/user', function (req, res) {
	  res.send('Got a DELETE request at /user');
	});

总之，我们现在设置一下www端口为80(默认ip端口)
这样我们就能直接输入我们的公网IP访问我们的app

###Express托管静态文件
在我安装express应用生成器的时候，我们看看app.js 里面就有那个

	app.use(express.static(path.join(__dirname, 'public')));

这就是引入static目录

官方文档里面所说的

如果我们想要改动Static目录，

我们就用

	app.use("/public", express.static(__dirname + “/public”));
	app.use("/public2", express.static(__dirname + “/public2”));

更改就好

我们可以在

	http://localhost/images/1.jpg
	http://localhost/css/style/css

访问这些东西

###express常见问题

#####我的应用该如何组织？

> 对于这个问题其实没有一个确定的答案。这要根据你的应用的规模和参与开发的团队来确定。为了尽可能灵活，Express 自身是并没有硬性要求应用结构是哪一种的。

根据你的需求，可以把路由和其他应用相关的业务逻辑存放在任意多个文件和任意目录中。下面推荐的实例或许对你能有一些启发：

	Route listings
	Route map
	MVC style controllers

#####如何定义模型（model）？

> Express自身并不感知数据库是否存在。数据库功能依赖于第三方 Node 模块提供的接口。

#####如何验证用户？

这是另一个 Express 不涉及的领域。你可以使用任何验证方式。对于简单的用户名/密码验证方式，可以参考这个实例。

#####Express 支持哪些模板引擎？

Express 支持任何符合 (path, locals, callback) 接口规范的模板引擎。 为了统一模板引擎的接口和缓存功能，请参考 consolidate.js 项目。其他未提及的模板引擎也可能支持 Express 接口规范。

#####如何处理 404 ？

在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。这是因为 404 只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件。如下：

	app.use(function(req, res, next) {
	  res.status(404).send('Sorry cant find that!');
	});

#####如何设置一个错误处理器？

错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 `(err, req, res, next)`：

	app.use(function(err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});

请参考错误处理章节以了解更多信息。

#####如何渲染纯 HTML 文件？

不需要！无需通过 res.render() 渲染 HTML。
你可以通过 res.sendFile() 直接对外输出 HTML 文件。
如果你需要对外提供的资源文件很多，
可以使用 express.static() 中间件。
