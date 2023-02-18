
// require 导入模块时 导入的结果永远以module.exports 指向的对象为准
// 默认情况下 exports和module.exports 指向同一个对象，最终共享的结果，还是以module.exports指向的对象为准

// 不论是内置模块，用户自定义模块，还是第三方模块，它们都会优先从缓存中加载，不会重复触发，以此提高模块的加载速度

function sayHello(name) {
    console.log(name, '你好')
}
const name = 'chiko'

module.exports.sayHello = sayHello;
module.exports.name = name;

// 错误写法
exports = {
    age: 18
}

exports.age = 18; //正确写法