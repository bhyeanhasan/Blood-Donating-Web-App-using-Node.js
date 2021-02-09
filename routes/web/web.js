let express = require("express")
let passport = require('passport');
let member = require('../../models/member');
let bodyParser = require('body-parser');
let router = express.Router()


router.get('/',(req,res)=>{

    res.render('home/home');
});

router.get('/update',(req,res)=>{


    res.render('home/update');
});

router.post('/update',(req,res,next)=>{
    let email = req.body.email;

    member.find({email: email},
        function(err, members){
            res.render('home/update_information',{members});
            console.log(members);
        });
});

router.post('/update_now',(req,res)=>{
        let name= req.body.name;
        let mobile= req.body.mobile;
        let faculty= req.body.faculty;
        let session= req.body.session;
        let blood= req.body.blood;
        let email= req.body.email;

    member.findOneAndUpdate({email: email}, {name: name,mobile:mobile,faculty:faculty,session:session,blood:blood}, function(err, response) {
        if(err)
        {
            res.json(err);
        }
        else {
            res.json("Success");
        }
    });
});

router.get('/members',(req,res)=>{
    member.find(function(err, members){
        res.render('home/members',{ members });
    });
});

router.get('/delete',(req,res)=> {
    res.render('home/delete');

});

router.post('/delete',(req,res)=>{
    member.remove({"email": req.body.myvar});
    console.log("ok");
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

    newUser.save((err,member)=>{
        if (err)
        {
            res.json(err);
        }
        else {
            res.json(member);
        }

    });

});


router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

module.exports = router;