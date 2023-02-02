var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 10;
const db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {
        title: "新規登録画面",
        form: new db.User(), 
        err: null
    }
    res.render('register', data);
});

router.post('/', function(req, res, next){
    hash_password = '';
    if(req.body.password){
        hash_password = bcrypt.hashSync(req.body.password, saltRounds);
    } 
    const form = {
        name: req.body.name, 
        email: req.body.email,
        password: hash_password
    };
    var data = {
        title: 'ログインページ', 
        content: 'ログインしてください。'
    }
    db.sequelize.sync()
        .then(() => db.User.create(form))
        .then(usr=> {
            res.render('login', data);
        })
        .catch(err=> {
            var data = {
                title: '新規登録画面', 
                form: form, 
                err: err
            }
            res.render('register', data);
        })
});


module.exports = router;
