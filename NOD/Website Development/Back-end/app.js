//gather packages
var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const passport = require('passport');
const expressHandlebars = require('express-handlebars');
const port = process.env.PORT || 9000;

app.set('view engine', 'ejs');


//routes for different collections
const pidataRoute = require('./routes/pidata');
const configurationRoute = require('./routes/configuration');
const piRoute = require('./routes/pi');
const userRoute = require('./routes/users');
const locationtRoute = require('./routes/location');
const uploader = require('./routes/upload');
const login = require('./routes/admin');



//initialize middleware
app.use(bodyParser.json())
//passport middleware used for authentication
app.use(passport.initialize())
app.use(passport.session())

//Route to handle request
app.use("/pidata", pidataRoute);
app.use("/configuration", configurationRoute);
app.use("/pi", piRoute);
app.use("/users", userRoute);
app.use("/location", locationtRoute);
app.use("/uploadfile",uploader);
app.use('/admin',login);

//create a connection to database
mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.zvdok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );



app.listen(port, ()=> console.log('Server started on port: ' + port));
