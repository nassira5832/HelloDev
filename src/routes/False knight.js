const router= express.router;
const character = require ("../models/False-knight-game-character");


router.post("/False knight",(req,res)=>{
      const {name , level }=req.body;
      if (!name || !level) {
            res.json("Name and level are required ")
      }
      try {
            const newCharacter= new character ({
                  name: name,
                  level: level
            })
        newCharacter.save(); 
        res.json("Character saved successfully");

      } catch (error) {
            console.log("Error while creating the character: ", error);
      }
      
})
