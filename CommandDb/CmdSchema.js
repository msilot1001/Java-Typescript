const mongoose = require("mongoose")

const cmdSchema = mongoose.Schema({
CmdName: {
    type: String,
    require : true
},
output: {
    type: String,
    require : true
},
react: {
    type: String
},
ownerreact: {
    type: String
},
})

const User = mongoose.model("User", cmdSchema)

module.exports = { User }