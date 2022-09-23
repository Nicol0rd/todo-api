const mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
    name: String,
    description: String,
    completed: {type:Boolean, default:false},
    is_deleted: {type:Boolean, default:false}
}, {
    timestamps: true
})

module.exports = mongoose.model("todo_collection", todoSchema);