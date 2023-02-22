const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
    console.log(req.method + req.baseUrl);
})

router.post('/user:id', (req, res) => {
    const param = res.param;
    console.log(req.url + param.id);
})

module.exports = router;

