var express = require('express');
var router = express.Router();

const db = require('../models/index');
/* GET home page. */
router.get('/', (req, res, next) => {
    if(req.session.login != null){
        db.Comment.findAll().then(usrs => {
            var data = {
                title: "みんなのデートスポット", 
                content: usrs
            }
            res.render('friends', data);
        });
    } else {
        var data = {
            title: 'ログインページ', 
            content: 'メールアドレスとパスワードを入力してください'
        }
        res.render('login', data);
    }
});

module.exports = router;
