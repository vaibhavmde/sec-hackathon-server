var bcrypt = require('bcryptjs');
var saltRound = 10;
var JWT = require('jsonwebtoken');
var JWTD = require('jwt-decode'); 
var  secret = 'asbmnsbdskjfsddssdnshls'
var hassPassword = async(pwd) => {
 let salt = await bcrypt.genSalt(saltRound);
 let hash = await bcrypt.hash(pwd,salt);
 return hash;
} 

var hashCompare = async(pwd,hash) => {
  let result = await bcrypt.compare(pwd,hash);
  return result;
}

var createToken = async(email,name)=>{
  let token = await JWT.sign({
    email,
    name
  },
  secret,
  {
    expiresIn:'5m'
  })
  return token;
} 

var verifyToken = async(req,res,next)=>{
  let decodeData=JWTD(req.header.token);
  console.log(decodeData);
  if(new Date()/1000<decodeData.exp){
    next();
  }else{
    res.json({
      statusCode:400,
      message:"Session Expired Please login again"
    })
  }
}


module.exports = { hassPassword,hashCompare,createToken,verifyToken };