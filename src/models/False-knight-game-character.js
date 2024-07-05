const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true
    }
});
const character= mongoose.model("character",characterSchema);
module.exports = { character };