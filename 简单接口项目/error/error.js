const joi = require('joi');
// 全局错误中间件
const error = (err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 如果需要token验证的接口，没有携带token 则身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
    // 未知错误
    res.cc(err)
}

module.exports = error;