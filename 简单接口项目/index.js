const express = require('express');
const cors = require('cors');
const router = require('./router/user');
const error = require('./error/error');
const cc = require('./error/cc');

const app = express();


// 响应错误中间件
app.use(cc);
// 解决跨域问题
app.use(cors());
// 配置解析表单数据的中间件 JSON类型
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));
// 调用路由
app.use(router);
// 错误处理路由
app.use(error);
app.listen(8888, () => {
    console.log('web server running at http://127.0.0.1:8888');
})