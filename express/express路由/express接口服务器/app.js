const express = require('express');
const router = require('./router');
const cors = require('cors')

const app = express();

// 配置解析表单数据的中间件 JSON类型
app.use(express.json());
// 配置解析表单数据的中间件 URL-encoded类型
app.use(express.urlencoded({ extended: false }));

// 一定要在路由之前调用，解决跨域问题
// cors 也叫跨域资源共享，由一系列的http响应头组成的，这些响应头决定了浏览器是否阻止前端js代码跨域获取资源
// cors 只需要在服务端做配置，客户端不需要额外做任何配置
// cors 存在兼容性问题，只有支持XMLHttpRequest level2的浏览器才能支持（现在大部分浏览器都能支持）

// cors 响应头部
app.use(cors());

app.use('/api', router);

app.listen(80, () => {
    console.log('web server running at http://127.0.0.1');
})