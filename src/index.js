const express=require("express");
const mongoose=require("express");
const app=express();
const {handleNotFound, handleInternalServerError, validateCharacter}= require("./middlewares/False knight")
const routes= require("./routes/False knight")

//challenge01
app.use(express.json());
app.use("/api",validateCharacter,routes);
app.use(handleNotFound);
app.use(handleInternalServerError);
//challenge02












const port=3000;
app.listen(port,()=>{
    console.log("serveur connecté au port 3000");
})