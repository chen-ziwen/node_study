const express = require('express');
const { update_userinfo } = require('../schema/userinfo');
const expressJoi = require('@escook/express-joi');
const userInfoHandle = require('../router/router_hander/userinfo');

const router = express.Router();

// 获取登陆用户的基本信息
router.get('/userinfo', userInfoHandle.getUserInfo);

// 获取任意用户的基本信息
router.get('/userinfo/everyone', userInfoHandle.getUserInfoEveryone);

// 更新登陆用户的信息
router.post('/userinfo', expressJoi(update_userinfo), userInfoHandle.updateUserInfo);

// 重置密码
router.post('/updatepwd', userInfoHandle.resetUserPassword)


module.exports = router;