const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValideror = require("mongoose-unique-validator");

const AscaoriginUserSchema = new Schema({

    fname: {
        type: String,
        required: true,
        unique: true
    },

    lname: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now(),
    },
})

AscaoriginUserSchema.plugin(uniqueValideror);

const AscaoriginUser = mongoose.model("AscaoriginUser", AscaoriginUserSchema);
module.exports = AscaoriginUser;