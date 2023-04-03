const express = require('express');
const userHandle = require('./router_handler');


// 创建路由对象
const router = express.Router();

// 注册新用户
router.post('/reguser', userHandle.regUser);

// 登录
router.post('/login', userHandle.login);

// 测试
router.get('/test', userHandle.test);

module.exports = router;
