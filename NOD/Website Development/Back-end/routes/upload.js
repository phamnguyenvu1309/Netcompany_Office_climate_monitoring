
const app = require('express');

const router = app.Router();

const multer = require('multer');

const uploader = multer({dest: 'uploads'});

router.post('/',uploader.single('myfile'),function(req,res,next){
   res.send(req.file);
})

module.exports = router;
