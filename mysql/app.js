const express = require('express');
const router = require('./router');
const cors = require('cors'); // 解决跨域问题
const center = require('./center');
const mysql = require('mysql');
const app = express();


const db = mysql.createPool({
    host: '127.0.0.1', // 数据库ip地址
    user: 'root', // 登陆数据库的账号
    password: 'czw5702059.', // 登陆数据库的密码
    database: 'my_db_01', // 指定要操作哪个数据库
})

db.query("select 1", (err, results) => {
    if (err) return console.log(err.message);
    console.log(results);
})























app.use(center.test); // 全局中间件 普通需要写在路由前面
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
app.use(center.err); // 错误中间件 需要写在路由后面

app.listen(8080, () => {
    console.log('web server running at http://127.0.0.1:8080');
})