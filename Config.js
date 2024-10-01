const mongoose=require('mongoose');
// mongoose.connect("mongodb+srv://harendrabhati:Tannu121@cluster0.zwgiw.mongodb.net/Project")
mongoose.connect("mongodb://127.0.0.1:27017/Item");

mongoose.connection.on("connected",()=>{console.log("connected")});
mongoose.connection.on("Disconnected",()=>{console.log("Disconnected")});
mongoose.connection.on("error",(error)=>{console.log(error)});
