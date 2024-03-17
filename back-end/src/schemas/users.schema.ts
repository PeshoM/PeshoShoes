//@ts-ignore
const mongoose = require('mongoose');
//@ts-ignore
const { Schema } = mongoose;
//@ts-ignore
const users = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("users", users);