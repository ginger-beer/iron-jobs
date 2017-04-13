const mongoose = require("mongoose");

let jobSchema = mongoose.Schema({
    name: String,
    company: String,
    link: String,
    notes: String,
    createTime: Date
});

module.exports = mongoose.model("Job", jobSchema);
