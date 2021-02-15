let express = require("express")
let router = express.Router()


router.use('/',require('./api'));

module.exports = router;