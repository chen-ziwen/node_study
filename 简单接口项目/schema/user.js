const joi = require('joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
// 自定义 当前的意思是必须为1到25个非空字符
const username = joi.string().pattern(/^[\S]{1,25}$/).required();

// 密码的验证规则
// 自定义 最小长度位6最大长度为20，限制为a-zA-Z0-9
const password = joi.string().min(6).max(20).alphanum().required();

// 后端限制的同时，前端也得做输入框的限制，对应这个
// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}