const express=require("express")
const mongoose=require("mongoose")
const router= express.Router();
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
// retrieving one game character
router.get("/FalseKnight/:id", async(req,res)=>{
      const {id} = req.params;
      try {
            const myCharacter = await character.findOne({ _id: id });
            res.json(myCharacter )
      }catch(error){
            res.json("error : ", error) ;
      }
})
// retrieving game characters
router.get("/FalseKnight/? page , limi", async(req,res)=>{
      const page =parseInt(req.query.page)|| 1 ;
      const limit = parseInt(req.query.limit)|| 10;
      try {
            const skip = (page-1)*limite
            const characters= await character.find ()
            .skip(skip)
            .limit(limit)
            const totalCount = await character.countDocuments();
            const totalPages = Math.ceil(totalCount / limit);
            const response = {
              characters,   
              page,         
              totalPages,   
              totalCount    
            };
            res.json(response)
      } catch (error) {
            console.log("erreur:", error);
      }

})

module.exports = router;
