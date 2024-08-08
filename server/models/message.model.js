const { default: mongoose } = require("mongoose");


const MessageSchema  = new mongoose.Schema({

    message:{
        type:String,
        required:true

    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }


},
{
    timestamps:true
}
);

module.exports = mongoose.model("Messages", MessageSchema);

