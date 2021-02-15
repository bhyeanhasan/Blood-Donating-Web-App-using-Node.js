let express = require("express");
let path = require("path");
let ejs = require('ejs')
let mongoose = require("mongoose");
let cookieParser = require('cookie-parser');
let passport = require('passport');
let session = require('express-session');
let flash = require('connect-flash');
let bodyParser = require('body-parser');


// App and port setup
    let app = express();
    app.set("port", process.env.PORT || 3000);


// database setup
    mongoose.connect("mongodb+srv://bhyean:28502850@cluster0.uugvv.mongodb.net/badhon>?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true, useCreateIndex:true}).then(()=>{
        console.log("Database Connected");
    });


//post method theke asa datagula hangle korbe
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'sdnjdsnvjdsuhdsufhudshfuhds',
    saveUninitialized:false
}));
mongoose.set('useFindAndModify', false);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


// Views setup
    app.set("views",path.join(__dirname,'views'));
    app.set("view engine", "ejs");
    app.use(express.static("public"));

// Route Setup
    app.use('/', require('./routes/web'));
    app.use('/api',require('./routes/api'));
    // let route = require("./routes");
    // app.use(route);




// Server Setup
    app.listen(app.get("port"),()=> {
        console.log('server started http://localhost:3000')
    });