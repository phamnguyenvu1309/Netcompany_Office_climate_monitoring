
const app = require('express');

const router = app.Router();

const mongoose = require('mongoose');

//Location model
var LocationSchema = new mongoose.Schema({
   id: String,
   office_code: String,
   floor_code: String
})
var Location = mongoose.model('Location', LocationtSchema)

router.get('/', function (req, res) {
   Location.find({}, function (err, location) {
      res.send(location)
   })
})

router.get('/admin', function (req, res) {
   Location.find({}, function (err, location) {
      res.render('Admin.jsx');
   })
})

router.post('/', function (req, res) {location
   Project.create(req.body, function (err, projects) {
      res.send(location)
   })
})

router.delete('/:_id', function (req, res) {
   Location.deleteOne({ id: req.params.id }, function (err, result) {
      res.send(result)
   })
})

router.put('/', function (req, res) {
   const filter = {id:req.body.id};
   const update = {office_code: req.body.office_code, floor_code: req.body.floor_code};

   Project.findOneAndUpdate(filter,update,function (err, result) {
      res.send(result)
   })
})


module.exports = router;
