let express = require("express")
let passport = require('passport');
let member = require('../../models/member');
let bodyParser = require('body-parser');
let router = express.Router()


router.get('/',(req,res)=>{
    // res.send('hello world');
    res.render('home/home');
});

router.get('/contact',(req,res)=>{
    res.send('babul hasan');
});

router.get('/about',(req,res)=>{
    res.send('node js');
});


router.get('/login',(req,res)=>{
    res.render('home/login')
});

router.get('/register',(req,res)=>{
    res.render('home/register')
});

router.post('/goto',(req,res,next)=>{

    let newUser = new member({
        name: req.body.name,
        mobile: req.body.mobile,
        faculty: req.body.faculty,
        session: req.body.session,
        blood: req.body.blood,
        password: req.body.password,
        email: req.body.email

    });

    res.json(newUser);

    newUser.save();

});


module.exports = router;