var express = require('express');
const { hassPassword,hashCompare,createToken,varifyToken} = require('../auth');
var router = express.Router();
var {mongodb,MongoClient,dbUrl} = require('../dbSchema');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(dbUrl);
  try{
    let db = await client.db('demo');
    let user = await db.collection('user').find().toArray();
    res.json({
      user
    })   
  } catch(err){
    console.log(error)
    res.json({
      statusCode:500,
      message:'Internal server error'
    })
  }
});


router.post('/login',async(req,res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db('demo');
    let user = await db.collection('user').findOne({email:req.body.email});
    if(user){
      let compare = await hashCompare(req.body.password,user.password);
      if(compare){
        let token= await createToken(user.email,user.firstname);
        console.log(token);  
        res.json({
          statusCode:200,

          email:user.email,
          firstname:user.firstname,
          lastname:user.lastname,
          type:user.type,
          message:'Login sucessfully',
          token
        })
      }else{
        res.json({
          statusCode:400,
          message:'Invalid Password'
        })
      }
    }else{
      res.json({
        statusCode:404,
        message:'User not Found'
      })
    }
  } catch (error) {
    console.log(error)
   res.json({
     statusCode:500,
     message:'Internal server error'
   })
  }
})
router.post('/register',async(req,res)=>{
 const client = await MongoClient.connect(dbUrl);

 try {
   const db = await client.db('demo');
   let user = await db.collection('user').find({email:req.body.email}).toArray();
   if(user.length>0){
     res.json({
       statusCode:400,
       message:'User already exists'
     })
   }else{
     let hashed = await hassPassword(req.body.password);
     req.body.password = hashed;
     let user = await db.collection('user').insertOne(req.body);
     res.json({
       statusCode:200,
       message:'Signup sucessfully',
     })
   }
 } catch (error) {
   console.log(error)
   res.json({
     statusCode:500,
     message:'Internal server error'
   })
 } finally{
   client.close();
 }
})



module.exports = router;
