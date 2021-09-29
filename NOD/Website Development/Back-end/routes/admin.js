const app = require('express');

const router = app.Router();

const bodyParser = require('body-parser')
 
router.use(bodyParser())
 
var cors = require('cors');
router.use(cors());
 
 
router.post('/', function(req, res){
    var user = req.body
    if(user.username==='admin' && user.password==='admin'){
        res.send({'result': 'authenticated'})
    }
    else{
        res.send({'result': 'notauthenticated'})
    }
});

 module.exports = router;