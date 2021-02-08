let express = require("express")
let router = express.Router()


router.get('/',(req,res)=>{
    // res.send('hello world');
    res.json('api response');
})


module.exports = router;