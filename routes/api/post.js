const express=require('express')
const router=express.Router();
const userauth=require('../../middleware/userauth');
const posts=require('../../models/Post')
//get api/users
//test route

//route to get all the posts
router.post('/all', userauth, async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.body;

        if (!latitude || !longitude || !radius) {
            return res.status(400).json({ error: "Latitude, longitude, and radius are required." });
        }

        // Convert radius from kilometers to degrees (for MongoDB's $geoWithin operator)
        const radiusInDegrees = process.env.RADIUS || 0.0002;

        // Perform a geospatial query to find posts within the specified radius
        let nearbyPosts = await posts.find({
            latitude: {
                $gte: latitude - radiusInDegrees,
                $lte: latitude + radiusInDegrees
            },
            longitude: {
                $gte: longitude - radiusInDegrees,
                $lte: longitude + radiusInDegrees
            }
        });

        res.json(nearbyPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


//route to add new post
router.post('/new',userauth,async (req,res)=>{
     try{
        let newpost=new posts({
            owned_id:req.body.userId,
            message:req.body.message,
            name:req.body.name,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            date:Date.now()
         });
         await newpost.save();
         return res.send({msg:'post saved'});
     }catch(err){
        res.status(400).send({err:"server error"});
     }

});


//route to delete already existing posts
router.post('/delete',userauth,async (req,res)=>{
    try{
        let post=await posts.findById(req.body.post_id)
        if(post){
            post.delete();
            return res.send({msg:"deleted the post"})
        }else{
            res.status(400).send({err:"post not found"});
        }
    }catch(err){
       res.status(400).send({err:"server error"});
    }

});

router.post('/addcomment',userauth,async(req,res)=>{
      try{
         let post=await posts.findById(req.body.post_id);
         post.comment.unshift({index:post.__v,user:req.body.user_id,comment:req.body.comment});
         await post.save();
         res.send({msg:"commented to this post"})
      }catch(err){
        res.status(400).send({err:"server error"})
      }
})

router.delete('/deletecomment',userauth,async(req,res)=>{
    try{
       let post=await posts.findById(req.body.post_id);
       let comment =post.comment.find((data)=>{return (data.user.toString()===req.body.user_id && data.index.toString()===req.body.index)});
       post.comment.remove(comment);
       await post.save();
       res.send({msg:"comment on this post is deleted"})
    }catch(err){
      res.status(400).send({err:"server error"})
    }
})
module.exports=router;