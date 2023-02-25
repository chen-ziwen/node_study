const express = require('express');
const sessin = require('express-session');
const router = require('./router');

const app = express();






// 使用sessin中间件
// 配置完成后，req上会多出一个req.session，从而用来存储用户的关键信息
app.use(sessin({
    secret: 'chiko yyds',
    resave: false, // 固定写法
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(80, () => {
    console.log('web serve running at http://127.0.0.1');
})