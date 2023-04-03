const express = require('express');
const cors = require('cors');
const router = require('./router/router');

const app = express();



// 解决跨域问题
app.use(cors());
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 调用路由
app.use(router);
app.listen(8888, () => {
    console.log('web server running at http://127.0.0.1:8888');
})