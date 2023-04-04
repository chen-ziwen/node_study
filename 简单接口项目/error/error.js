const joi = require('joi');

const error = (err, req, res, next) => {
    console.log(err, 'err');
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知错误
    res.cc(err)
}

module.exports = error;