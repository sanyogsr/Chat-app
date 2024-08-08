const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.route")
const messageRoute = require("./routes/message.route")
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected Successfully")
    
}).catch(err=>console.error("Mongodb connection error: ",err));

app.get("/ping",(_req,res)=>{
    return res.json({msg:"Ping Successful"});
});

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute);


const server = app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`Server started the on ${process.env.PORT}`)
    
})
const io = socket(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
    }
});

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket =socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.msg);
        }
    })

})