const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValideror = require("mongoose-unique-validator");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.plugin(uniqueValideror);

const User = mongoose.model("User",userSchema);
module.exports = User;