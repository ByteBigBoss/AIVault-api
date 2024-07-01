const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fireSchema = new Schema({
    fireUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AscaoriginUser",
        required: true
    },

    tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },

    register_date:{
        type:Date,
        default:Date.now(),
      },
})

const Fire = mongoose.model("Fire", fireSchema);

module.exports = Fire;