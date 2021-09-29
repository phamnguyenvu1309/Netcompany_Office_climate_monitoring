const app = require('express');

const router = app.Router();

const mongoose = require('mongoose');



//Course model
var PiSchema = new mongoose.Schema({
    id: String,     
    location: String,
    intervalset: Float32Array,
 })

 var Pi = mongoose.model('Pi', PiSchema)

 router.get('/', function (req, res) {
    Pi.find({}, function (err, pi) {
       res.send(pi)
    })
 })
 
 router.post('/', function (req, res) {
    Pi.create(req.body, function (err, pi) {
       res.send(pi)
    })
 })
 
 router.delete('/:id', function (req, res) {
    Pi.deleteOne({ id: req.params.id }, function (err, result) {
       res.send(result)
    })
 })
 
 router.put('/', function (req, res) {
   const filter = {id:req.body.id};
   const update = {location:req.body.location, intervalset:req.body.intervalset};
    Pi.findOneAndUpdate(filter,update, function (err, result) {
       res.send(result)
    })
 })
 

module.exports = router;