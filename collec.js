const express=require("express");
const router=express.Router();
const Col=require('../models/Col')


// router.get("/",(req,res)=>{
//     console.log(req.body);
//     const col=Col(req.body);
//     col.save()
//     res.send("hello");
// })



 router.post("/add",async(req,res)=>{
     const {colname,colcity}=req.body;
     if(!colname){
        res.status(404).json("please fill the name data");
     }
     try {
        const addcoll= new Col({colname,colcity});
        await addcoll.save();
        res.status(201).json(addcoll);
        
     } catch (error) {
        res.status(404).json(error)
     }
 })

 router.get("/getdata",async(req,res)=>{
   try{
      const getcoll= await Col.find();
      res.status(201).json(getcoll)
   }
   catch(error){
      res.status(404).json(error);
   }
   
 })

  router.get("/getsdata/:id",async(req,res)=>{
    try{
      const {id}=req.params;
      const inddata=await Col.findById({_id:id});
       res.status(201).json(inddata)
    }catch(error){
       res.status(422).json(error);
    }
   })

    router.patch("/updata/:id",async(req,res)=>{
       try{
          const {id} =req.params;
          const updateuser=await Col.findByIdAndUpdate(id,req.body,{
             new:true
          });
          res.status(201).json(updateuser);
       }catch(error){
          res.status(422).json(error);
       }
    })

    router.delete("/deletedata/:id",async(req,res)=>{
       try{
          const {id}=req.params;
          const deletdata=await Col.findByIdAndDelete({_id:id})
          res.status(201).json(deletdata);
       }catch (error){
          res.status(422).json(error);
       }
    })

    router.get("/serch/:key",async(req,resp)=>{
      let result=await Col.find({
         "$or":[
            {
               colname:{$regex:req.params.key}
            },
            {
               colcity:{$regex:req.params.key}
            }
         ]
      });
      resp.send(result);
    })



module.exports=router;