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
    let obj ={
        name:req.body.name,
        id : req.body.id
    };
   res.json({
       ok:obj
   });
});


module.exports = router;