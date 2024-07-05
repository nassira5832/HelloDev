const router= express.router;
const character = require ("../models/False-knight-game-character");

// adding 
router.post("/Falseknight",async(req,res)=>{
      const {name , level }=req.body;
      if (!name || !level) {
            res.json("Name and level are required ")
      }
      try {
            const newCharacter= new character ({
                  name: name,
                  level: level
            })
        await newCharacter.save(); 
        res.json("Character saved successfully");

      } catch (error) {
            console.log("Error while creating the character: ", error);
      }
      
})
// updating 
 router.put("/FalseKnight/:id", async(req,res)=>{
      const {name , level} = req.body;
      const {id} = req.params;
      try {
            const myCharacter = await character.findOne({ _id: id });
            
    if (!myCharacter) {
      return res.status(404).send('Character not found');
    }
    if (!name || !level) {
      return  res.json("Name and level are required ")
    }
    myCharacter.name=name;
    myCharacter.level=level;
    await myCharacter.save();
      } catch (error) {
           res.json("error : ", error) ;
      }
 })
 // deleting 
 router.delete("/FalseKnight/:id", async(req,res)=>{
      const {id} = req.params;
      try {
            const myCharacter = await character.findOne({ _id: id });
            myCharacter.delete();
            res.json("character deleted successfully ")
      }catch(error){
            res.json("error : ", error) ;
      }
})

