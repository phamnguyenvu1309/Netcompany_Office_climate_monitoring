const app = require('express');

const router = app.Router();

const mongoose = require('mongoose');

var auth = function (req,res,next){
   var authorization = req.headers.authorization
   console.log(authorization)

   var userpass = authorization.split(' ')[1]
   var plaintext = Buffer.from(userpass,'base64').toString('ascii')

   var username = plaintext.split(':')[0]
   var password = plaintext.split(':')[1]

   if(username=='admin' && password=='admin'){
      next();
   }
   else{
      res.send('Wrong username/password')
   }
}



//Course model
var UserSchema = new mongoose.Schema({
   id: String,
   fullname: String,
   username: String,
   password: String,
   email: String
});

var User = mongoose.model('User', UserSchema)

router.get('/', function (req, res) {
   User.find({}, function (err, users) {
      res.send(users)
   })
})

router.get('/users', function(req,res){
   res.send('Login successfully');
   res.redirect('/admin')
})

router.post('/', function (req, res) {
   User.create(req.body, function (err, users) {
      res.send(users)
   })
})

router.delete('/:id', function (req, res) {
   User.deleteOne({ id: req.params.id }, function (err, result) {
      res.send(result)
   })
})
User
router.put('/', function (req, res) {
   User.findOneAndUpdate({ id: req.body.id }, { fullname: req.body.fullname },{username:req.body.username},{password:req.body.password},
      {email:req.body.email}, function (err, result) {
      res.send(result)
   })
})


router.get('/search/:keyword', function (req, res) {
   User.find({ name: req.params.keyword }, function (err, result) {
      res.send(result)
   })
})

module.exports = router;