const express = require('express');
const router = require('./router');
const cors = require('cors'); // 解决跨域问题
const center = require('./center');
const mysql = require('mysql');
const app = express();

// mql 8.0 需要特殊配置，而且visual studio 2022 不兼容 只能下2019
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库ip地址
    user: 'root', // 登陆数据库的账号
    password: 'czw5702059.', // 登陆数据库的密码
    database: 'my_db_01', // 指定要操作哪个数据库
})
const str = "select * from users";
// db.query(str, (err, results) => {
//     if (err) return console.log(err.message);
//     console.log('查询成功', results);
// })
// 插入语法
// const user = {
//     username: "angle",
//     password: "245255",
// }
// const insert = "insert into users (username,password)  values (?,?)";
// db.query(insert, [user.username, user.password], (err, results) => {
//     if (err) return console.log(err.message);
//     if (results.affectedRows == 1) {
//         console.log('插入成功');
//     };
// })

// 快捷插入语法
const insert = "insert into users set ?"
const user = [
    { username: "lisan22", password: "889568" },
    { username: "zhang78", password: '147852369' },
    { username: "zhang12", password: '147852369' },
    { username: "zhang52", password: '147852369' },
    { username: "zhang45", password: '147852369' },
];
// 便利数组一次性插入
for (let i of user) {
    db.query(insert, i, (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows == 1) {
            console.log('插入成功');
        };
    })
}






















app.use(center.test); // 全局中间件 普通需要写在路由前面
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
app.use(center.err); // 错误中间件 需要写在路由后面

app.listen(8080, () => {
    console.log('web server running at http://127.0.0.1:8080');
})