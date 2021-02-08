let mongoose = require("mongoose");

let memberModel =new mongoose.Schema({
    name: {type:String, required:true},
    mobile: {type:String, required:true},
    faculty: {type:String, required:true},
    session: {type:String, required:true},
    blood: {type:String, required:true},
    email: {type:String, required: true,unique:true},
    password: {type:String, required:false}
});

let Member = mongoose.model("member",memberModel);

module.exports = Member;