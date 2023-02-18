const { name, sayHello } = require('./index') // 可加后缀可不加 node会自动补齐 // 自定义模块的导入方式
const fs = require('fs') // 官方和第三方模块的导入方式

sayHello(name)