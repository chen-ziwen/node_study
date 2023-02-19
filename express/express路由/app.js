const express = require('express');
const router = require('./express路由模块/router.js');

const app = express();

// express中的路由指的是客户端的请求与服务器处理函数之间的映射关系
// express中的路由分3部分组成，分别是请求的类型，请求的url地址，处理函数
// 格式： app.method(path,fun)

// 这个就是express的路由
// app.use('/user', router); 这么写可以给user当前路由统一添加一个前缀路径/user
app.use(router);

app.listen(80, () => {
    console.log('web server running at http://127.0.0.1');
})
