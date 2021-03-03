let express = require("express")
let member = require('../../models/member');
let bodyParser = require('body-parser');
let router = express.Router()


router.get('/',(req,res)=>{
    res.status(200).json({
        message: "Pasisi"
    })
})
router.get('/members',(req,res)=>{
        member.find(function(err, members){
            res.status(200).json({
                members
            })
        });
});

router.post('/members',(req,res)=>{
    let newUser =new member({
        name: req.body.name,
        mobile: req.body.mobile,
        faculty: req.body.faculty,
        session: req.body.session,
        blood: req.body.blood,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save((err,member)=>{
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.status(200).json("Member Successfully added");
        }
    });
});


module.exports = router;