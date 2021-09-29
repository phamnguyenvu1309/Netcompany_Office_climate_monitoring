
const app = require('express');

const router = app.Router();

const mongoose = require('mongoose');

//PiData model
var PiSchema = new mongoose.Schema({
   id: String,
   pi_id: String,
   value: Float32Array
})
var PiData = mongoose.model('PiData', PiDataSchema)

router.get('/', function (req, res) {
   PiData.find({}, function (err, pidata) {
      res.send(pidata)
   })
})

router.post('/', function (req, res) {
   PiData.create(req.body, function (err, pidata) {
      res.send(pidata)
   })
})

router.delete('/:id', function (req, res) {
   PiData.deleteOne({ id: req.params.id }, function (err, result) {
      res.send(result)
   })
})

router.put('/', function (req, res) {
   PiData.findOneAndUpdate({ id: req.body.id }, { pi_id: req.body.pi_id }, function (err, result) {
      res.send(result)
   })
})


module.exports = router;
