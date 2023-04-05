const express = require('express');
const cors = require('cors');
const user = require('./router/user');
const userinfo = require('./router/userinfo')
const error = require('./error/error');
const cc = require('./error/cc');
// 配置文件
const config = require('./router/router_hander/config');
// 解析token中间件
const { expressjwt: jwt } = require('express-jwt');

const app = express();
// 响应错误中间件
app.use(cc); // 这个中间件需要放在所有中间件之前
// 解决跨域问题
app.use(cors());
// 配置解析表单数据的中间件 JSON类型
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(jwt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));
// 调用用户登录注册路由
app.use('/api', user); // 用户注册 用户登录接口 不需要token验证
app.use(userinfo); // 用户注册 用户登录接口 不需要token验证
// 错误处理路由
app.use(error);
app.listen(8888, () => {
    console.log('web server running at http://127.0.0.1:8888');
})