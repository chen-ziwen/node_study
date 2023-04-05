const joi = require('joi');

// 定义 id, nickname, emial 的验证规则
const nickname = joi.string().required();
const email = joi.string().email();
const phone = joi.string().pattern(/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/);

exports.update_userinfo = {
    body: {
        nickname,
        email,
        phone,
    }
}
