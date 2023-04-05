const express = require('express');
// 导入用户路由处理函数
const userHandle = require('./router_hander/user');

// 1.导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 2.导入需要验证的规则对象
const { reg_login_schema } = require('../schema/user');


// 创建路由对象
const router = express.Router();

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandle.regUser);

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandle.login);

module.exports = router;
