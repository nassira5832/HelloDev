const mongoose = require("mongoose")
const player = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    }, 
    value:{
        type:String,
        required:true, 
        enum: ['X', 'O']
    }
})
const gameRound  = new mongoose.Schema({
    player1 : {
        type: player,
    },
    player2: {
        type: player,
    }, 

})
 const Player = mongoose.model("Player", player)
 const GameRound = mongoose.model("GameRound", gameRound)
 module.exports = { Player,GameRound };