var express = require('express');
const multer = require('multer');
const { validationResult } = require('express-validator');
var router = express.Router();

const db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.login != null){
    db.Comment.findAll({
        where: {
            userId: req.session.login['id']
        }
    }).then(coms => {
        var data = {
            title: 'マイページ', 
            content: coms
        }
        res.render('mypage', data);
    });
  } else {
    var data = {
        title: 'ログインページ', 
        content: 'ログインしてください。'
    }
    res.render('login', data);
  }
});

router.get('/add', (req, res, next) => {
    var data = {
        form: new db.Comment(), 
        title: '投稿ページ', 
        err: null
    };
    res.render('mypage/add', data);
});

const storage =  multer.diskStorage({
    destination: './public/images/place_image',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  const uploader = multer({ storage })

router.post('/add', uploader.single('place_image'),function(req, res, next){
    var image_directory = null;
    if(req.file){
        image_directory = 'images/place_image/' + req.file['filename'];
    } else {
        image_directory = null;
    }
    if(req.session.login != null){
        var userId = req.session.login['id']; 
        const form = {
            place: req.body.place, 
            prefectures: req.body.prefectures, 
            userId: userId, 
            comment: req.body.comment, 
            image_directory: image_directory
        };
        db.sequelize.sync()
            .then(() => db.Comment.create(form))
            .then(usr => {
                res.redirect('/mypage');
            })
            .catch(err => {
                var data = {
                    title: '投稿ページ', 
                    form: form, 
                    err: err
                }
                console.log("動作が異常です");
                res.render('mypage/add', data);
            })
    } else {
        var data = {
            title: 'ログインページ', 
            content: 'ログインしてください。'
        }
        res.render('login', data);
    } 
});



module.exports = router;
