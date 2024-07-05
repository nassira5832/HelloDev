const express=require("express");
const mongoose=require("mongoose");
const {handleNotFound, handleInternalServerError}= require("./middlewares/False knight")
const routes= require("./routes/False knight")
const {Server}= require("socket.io")
const nodemon = require("nodemon")
const app=express();
const path= require("path")
//challenge01
app.use(express.json());
app.use("/api",routes);
app.use(handleNotFound);
app.use(handleInternalServerError);
//challenge02


//challenge03
// crée un serveur HTTP qui utilise Express pour gérer les requêtes
const server=http.createServer(app)
//attacher socket.io à mon serveur HTTP
const io= new Server(server)

app.use(express.static(path.resolve("public")));
app.get("/MantisLords", (req,res)=>{
    res.sendFile("index.html")
})







const port=3000;
app.listen(port,()=>{
    console.log("serveur connecté au port 3000");
})