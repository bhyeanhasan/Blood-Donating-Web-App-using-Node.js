let express = require("express")
let router = express.Router()

router.use('/',require('./web'));

module.exports = router;