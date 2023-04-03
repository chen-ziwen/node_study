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
// 查询
const str = "select * from users";
db.query(str, (err, results) => {
    if (err) return console.log(err.message);
    console.log('查询成功', results);
})
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
// const insert = "insert into users set ?"
// const user = [
//     { username: "lisan22", password: "889568" },
//     { username: "zhang78", password: '147852369' },
//     { username: "zhang12", password: '147852369' },
//     { username: "zhang52", password: '147852369' },
//     { username: "zhang45", password: '147852369' },
// ];
// 便利数组一次性插入
// for (let i of user) {
//     db.query(insert, i, (err, results) => {
//         if (err) return console.log(err.message);
//         if (results.affectedRows == 1) {
//             console.log('插入成功');
//         };
//     })
// }

// 更改数据库信息
// const update = "update users set username=?,password=? where id = ?";
// db.query(update, ["wangyunzhi", "nishiwodepengyou", 23], (error, results) => {
//     if (error) return console.log(err.message);
//     if (results.affectedRows == 1) {
//         console.log('修改成功');
//     };
// })

// 快捷修改数据库信息
// const qupdate = "update users set ? where id = ?"
// db.query(qupdate, [{ username: '唐老鸭', password: '245255' }, 22], (error, results) => {
//     if (error) return console.log(error.message);
//     if (results.affectedRows === 1) {
//         console.log('修改成功')
//     }
// })

// db.query(str, (err, results) => {
//     if (err) return console.log(err.message);
//     console.log('查询成功', results);
// })

// 数据库删除数据，最好根据唯一标识，例如：id来删除对应数据，避免出大问题。
// 如果sql语句中有多个占位符，则必须使用数组为每个占位符指定具体的值。
// 如果sql语句中只有一个占位符，则可以省略数组。
const strDelete = "delete from users where id = ?";
db.query(strDelete, 23, (error, results) => {
    if (error) return console.log(error);
    if (results.affectedRows === 1) {
        console.log("删除成功")
    }
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