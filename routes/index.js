var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require('../schemas/user');
const user = new UserModel();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});


/* POST login page. */
router.post('/login', function (req, res, next) {



  bcrypt.compare(req.body.password, hash, function (err, result) {
    if (result) {
      // password is valid
    }
  });

  console.log(req.body);
  res.render('login', { title: 'Login' });
});



/* GET register page. */
router.get('/register', function (req, res, next) {


  res.render('register', { title: 'Create account' });
});

/* POST register page. */
router.post('/register', function (req, res, next) {
  console.log(req.body);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, function (err, hash) {

      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.email = req.body.email;
      user.password = hash;

      user.save().then(savedUser => {
        console.log(savedUser);
        res.render('login', { title: 'Create account' });
      }).catch((error) => {
        console.log(error);
      });

    });
  })


});



module.exports = router;
