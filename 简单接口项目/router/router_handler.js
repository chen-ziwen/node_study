// const db = require('../db/index');
const db = require('../db/config');

const regUser = (req, res) => {
    res.send('reguser OK')
};

const login = (req, res) => {
    res.send('login OK')
};

const test = async (req, res) => {
    const sql = "SELECT * FROM article_cate WHERE name = ? ";
    const name = req.query.name;
    // 将数据库读取变为同步操作
    const result = await db.connect(sql, name);
    if (result.length == 0) {
        res.send({
            message: '暂无数据',
            code: 200,
            result: [],
        })
    } else {
        res.send(JSON.stringify({
            message: '请求成功',
            code: 200,
            result,
        }))
    }
}

module.exports = {
    regUser,
    login,
    test,
};
