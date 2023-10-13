let jwt=require('jsonwebtoken');
async function userauth(req,res,next){
    try{
        let token=await jwt.verify(req.body.token,process.env.SECRETKEY);
        req.body.userId=token.user.id; 
        req.body.name=token.user.name;
        next();
    }catch(err){
        res.status(400).send({err:"login required"});
    }
}

module.exports=userauth;