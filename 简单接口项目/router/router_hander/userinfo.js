const db = require('../../db/config');
const bcrypt = require('bcryptjs');

// 获取登陆用户的基本信息
const getUserInfo = async (req, res) => {
    const userinfoSql = 'SELECT username,nickname,email,phone FROM user_message WHERE username = ?'
    // express-jwt 中间件会将用户信息auth对象挂载在req上。
    try {
        const reslut = await db.connect(userinfoSql, req.auth.username);
        if (reslut.length !== 1) {
            return res.cc('获取用户信息失败');
        }
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: reslut,
        })
    } catch (error) {
        return res.cc(error)
    }
};

// 获取任意用户的基本信息
const getUserInfoEveryone = async (req, res) => {
    const username = req.query.username;
    const userinfoSql = 'SELECT username,nickname,email,phone FROM user_message WHERE username = ?'
    // express-jwt 中间件会将用户信息auth对象挂载在req上。
    try {
        const reslut = await db.connect(userinfoSql, username);
        if (reslut.length !== 1) {
            return res.cc('获取用户信息失败');
        }
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: reslut,
        })
    } catch (error) {
        return res.cc(error)
    }
};

// 更新登陆用户的信息
const updateUserInfo = async (req, res) => {
    const updateinfoSql = 'UPDATE user_message SET ? WHERE username = ?'
    try {
        const result = await db.connect(updateinfoSql, [req.body, req.auth.username]);
        if (result.affectedRows !== 1) {
            return res.cc('修改用户信息失败');
        }
        return res.cc('修改用户信息成功！', 0);
    } catch (error) {
        return res.cc(error)
    }
}

// 重置密码
const resetUserPassword = async (req, res) => {
    const checkInfoSql = 'SELECT * FROM user_message WHERE username = ?';
    try {
        const result = await db.connect(checkInfoSql, req.auth.username);
        if (result.length !== 1) {
            return res.cc('用户不存在！');
        }
        // 输入新密码对比旧密码
        const compareResult = bcrypt.compareSync(req.body.oldpwd, result[0].password)
        if (!compareResult) {
            return res.cc('原密码错误，请重新输入！');
        }

        // 更新密码
        const resetPasswordSql = 'UPDATE user_message SET password = ? WHERE username = ?';
        const newpwd = bcrypt.hashSync(req.body.newpwd, 10);

        try {
            const nresult = await db.connect(resetPasswordSql, [newpwd, req.auth.username]);
            if (nresult.affectedRows !== 1) {
                return res.cc('更新密码失败！')
            }
            res.cc('更新密码成功！', 0);
        } catch (error) {
            return res.cc(error)
        }

    } catch (error) {
        return res.cc(error);
    }
}

module.exports = {
    getUserInfo,
    getUserInfoEveryone,
    updateUserInfo,
    resetUserPassword,
}

