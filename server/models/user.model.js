const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({

  username:{
    type:String,
    unique:true,
    required:true,
    min:4,
    max:20
  },
  email:{
    type:String,
    unique:true,
    required:true,
    max:5
  },
  password:{
    type:String,
    required:true,
    min:6,
    max:20
  },
  isAvatar:{
    type:Boolean,
    default:false
  },
  avatarImage:{
    type:String,
    default:""
  },

})

module.exports =mongoose.model("Users",userSchema);