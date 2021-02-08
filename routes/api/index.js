let express = require("express")
let router = express.Router()


router.use('/users',require('./api'));

module.exports = router;