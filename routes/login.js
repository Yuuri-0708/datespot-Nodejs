var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/index');


/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {
        title: 'ログインページ', 
        content: 'メールアドレスとパスワードを入力してください'
    }
  res.render('login', data);
});

router.post('/', (req, res, next) => {
    console.log(next);
    db.User.findOne({
        where:{
            email: req.body.email, 
        },
    }).then(usr => {
        if(usr != null) {
            if(bcrypt.compareSync(req.body.password, usr['password'])){
                req.session.login = usr;
                let next_page = req.session.next;
                if(next_page == null){
                    next_page = '/mypage';
                }
                res.redirect(next_page);
            } else {
                var data = {
                    title: 'ログインページ', 
                    content: 'メールアドレスかパスワードに誤りがあります。'
                }
                res.render('login', data);
            }
        } else {
            var data = {
                title: 'ログインページ', 
                content: 'メールアドレスかパスワードに誤りがあります。'
            }
            res.render('login', data);
        }
    })
})

module.exports = router;
