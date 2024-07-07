const mongoose= require("mongoose")
const express= require("express")
const router= express.Router();
const {Player , GameRound} = require("../models/MantisLords");


///////palyers 
// adding player 
router.post("/", async(req,res)=>{
    const {name, value}=req.body; 
    try{
        const newplayer = new Player({
            name: name,
            value: value
        })
        await newplayer.save();
        res.json("newplayer")
    }catch(error){
        console.log("erreur:", error)

    }
    
})

//upditing player 
router.put("/:id",async(req,res)=>{
    const id = req.params;
    const {name , value}=req.body 
    const player= await Player.findOne({ _id: id });
    try {
        
        player.name= name;
        player.value=value

        await player.save();
    } catch (error) {
        console.log("erreur::", error)
    }
})
//deleting player 
router.delete('/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);

        if (!player) {
            return res.status(404).send();
        }

        res.send(player);
    } catch (error) {
        console.log("erreur::", error)
    }
});
// get player by id 
router.get("/:id", async(req, res)=>{
    const {id} =req.params
    try {
        const player= await Player.findOne({ _id: id });
        res.json(player)
    } catch (error) {
        console.log("erreur::", error)
    }
})
//get all players avec pagination
router.get("/players/? page , limit", async(req, res)=>{
      const page =parseInt(req.query.page)|| 1 ;
      const limit = parseInt(req.query.limit)|| 10;
      try {
            const skip = (page-1)*limite
            const players= await Player.find ()
            .skip(skip)
            .limit(limit)
            const totalCount = await Player.countDocuments();
            const totalPages = Math.ceil(totalCount / limit);
            const response = {
              players,   
              page,         
              totalPages,   
              totalCount    
            };
            res.json(response)
      } catch (error) {
            console.log("erreur:", error);
      }
})


////////// gameround
// adding gameround 
router.post("/game-round", async (req, res) => {
  const { player1, player2 } = req.body;

  try {
    if (!player1 || !player2) {
      return res.send("Les informations des deux joueurs sont requises.");
    }
    const newGameRound = new GameRound({
      player1,
      player2
    });
    await newGameRound.save();

    res.json(newGameRound);
  } catch (error) {
    console.error("Erreur:", error);
  }
});

//upditing gameround 
router.put("/game-round/:id", async (req, res) => {
    const { id } = req.params;
    const { player1, player2 } = req.body;
  
    try {
      if (!player1 || !player2) {
        return res.send("Les informations des deux joueurs sont requises.");
      }
      const updatedGameRound = await GameRound.findByIdAndUpdate(
        id,
        { player1, player2 },
        { new: true, runValidators: true }
      );
      const gameround=await GameRound.findById(id)
      gameround.player1=player1; 
      gameround.player2=player2; 
      await gameRound.save();

    } catch (error) {
      console.error("Erreur :", error);
    }
  });
//deleting gameround 
router.delete("/game-round/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedGameRound = await GameRound.findByIdAndDelete(id);
      if (!deletedGameRound) {
        return res.status(404).send("GameRound non trouvé.");
      }
      res.status(200).send("GameRound supprimé avec succès.");
    } catch (error) {
      console.error("Erreur", error);
     }
  });
// get gameround by id 
router.get("/game-round/:id",async(req, res)=> {
    const { id } = req.params;
    try {
        const gameRound= await GameRound.findById(id)  
        res.json(gameRound)
    } catch (error) {
        console.error("Erreur", error);
    } 
})
module.exports = router;
