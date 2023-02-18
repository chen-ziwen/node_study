
// require 导入模块时 导入的结果永远以module.exports 指向的对象为准
// 默认情况下 exports和module.exports 指向同一个对象，最终共享的结果，还是以module.exports指向的对象为准

// console.log('module', module, exports);

function sayHello(name) {
    console.log(name, '你好')
}
const name = 'chiko'

module.exports.sayHello = sayHello;
module.exports.name = name;