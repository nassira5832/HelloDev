const express=require("express");
const mongoose=require("mongoose");
const {handleNotFound, handleInternalServerError, validateRequestBody}= require("./middlewares/False knight")
const routes= require("./routes/False knight")
const {Server}= require("socket.io")
const cors = require("cors")
const app=express();
const appSocket=express();
const path= require("path")
const http =require("http")
const routesChallenge03=require("./routes/MantisLords")
const{handleNotFoundCh3, handleInternalServerErrorCh3, validatePutRequest,validatePostRequest}=require("./middlewares/MantisLords")
// challenge01
app.use(express.json());
app.use(validateRequestBody);
app.use("/api", routes);
app.use(handleNotFound);
app.use(handleInternalServerError);

// challenge02
const portAPI = 5000;
app.listen(portAPI, () => {
    console.log(`Serveur API connecté au port ${portAPI}`);
});

// challenge03 /*MantisLords*/


// crée un serveur HTTP qui utilise Express pour gérer les requêtes
const serverSocket = http.createServer(appSocket);
// attacher socket.io à mon serveur HTTP
const io = new Server(serverSocket);



appSocket.use(express.static(path.resolve("../public")));

let Arr=[]
let playingArray=[]
io.on("connection",(socket)=>{
    socket.on("find",(e)=>{
        if(e.name!=null){
            Arr.push(e.name)
            if (Arr.length>=2){
                let obj1 ={
                    name1:Arr[0],
                    value1:"X",
                    move1:""
                }
                let obj2 ={
                    name2:Arr[1],
                    value2:"O",
                    move2:""
                    
                }
                let obj ={
                    p1:obj1,
                    p2:obj2, 
                    sum:1
                }
                playingArray.push(obj)
                Arr.splice(0,2)
                io.emit("find", {allPlayers: playingArray})
            }
        }
    })
    socket.on("playing", (e)=>{
        if(e.valeur=="X"){
              
            let objTochange=playingArray.find(obj=>obj.p1.name1===e.name)
            objTochange.p1.move1=e.id
            objTochange.sum=objTochange.sum+1

        }else{
            if(e.valeur=="O"){
                let objTochange=playingArray.find(obj=>obj.p2.name2===e.name)
                objTochange.p2.move2=e.id
                objTochange.sum=objTochange.sum+1

            }
        }  
       io.emit("playing",{allPlayers:playingArray})
        
    })
    socket.on("gameOver",(e)=>{
        playingArray=playingArray.filter(obj=>obj.p1.name1 !== e.name)
    })
})

appSocket.use(express.json());
appSocket.use(validatePutRequest);
appSocket.use(validatePostRequest);
appSocket.use("/api", routesChallenge03);
appSocket.use(handleInternalServerErrorCh3);
appSocket.use(handleNotFoundCh3);


appSocket.get("/", (req, res) => {
    res.sendFile(path.resolve( "../public/index.html"));
});

const portSocket = 5001;
serverSocket.listen(portSocket, () => {
    console.log(`Serveur Socket.IO connecté au port ${portSocket}`);
});