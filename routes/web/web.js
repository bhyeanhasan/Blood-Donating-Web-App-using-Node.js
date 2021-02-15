let express = require("express")
let passport = require('passport');
let member = require('../../models/member');
let bodyParser = require('body-parser');
let router = express.Router()

// Get Request manage part:

    // homepage
    router.get('/',(req,res)=>{
        let who =req.session.member;
        res.render('home/home',{who});
    });
    // view all members, user must be logged in
    router.get('/members',(req,res)=>{
        let who =req.session.member;
        let ok ="Please log in first";
        if(! who)  res.redirect("/");
        else {
            member.find(function(err, members){
                res.render('home/members',{ members ,who});
            });
        }
    });
    // goto delete page
    router.get('/delete',(req,res)=> {
        let who =req.session.member;
        res.render('home/delete',{who});
    });

    router.get('/update',(req,res)=>{
        let who =req.session.member;
        res.render('home/update',{who});
    });

    router.get('/login',(req,res)=>{
        let who =req.session.member;
        res.render('home/login',{who});
    });

    router.get('/register',(req,res)=>{
        let who =req.session.member;
        res.render('home/register',{who});
    });

    router.get('/logout',(req,res)=>{
        req.session.destroy((err,ok)=>{
            res.redirect('/');
        });
    });


    // router.get('*', function(req, res){
    //     let who =req.session.member;
    //     res.send('Sorry, this is an invalid URL.');
    // });

// Post Request manage part:

    router.post('/update',(req,res,next)=>{
        let email = req.body.email;
        let who =req.session.member;

        member.find({email: email},
            function(err, members){
                res.render('home/update_information',{members,who});
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

    router.post('/delete',(req,res)=>{
        member.findOneAndDelete({"email": req.body.email},(err,ok)=>{
            if(err)
            {
                res.json(err);
            }
            else{
                res.redirect('/members');
            }
        });
    });

    router.post('/login', (req,res)=>{
        let email = req.body.email;
        let password = req.body.password;
        member.findOne({email:email},(err,Member)=>{
            if(err){
                console.log(err);
            }
            else if(!Member)
            {
                res.json("NOT FOUND");
            }
            else
            {
                if(Member.password === password ) {
                    req.session.member = Member;
                    res.redirect("/");
                }
                else{
                    res.json("failed");
                }
            }
        });
    })


    router.post('/goto',(req,res,next)=>{
        let newUser = new member(
    {
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
            else
            {
                res.json(member);
            }
        });
    });

module.exports = router;