const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next)=>{
    //Get token from header 
    const token = req.header('x-auth-token');
    //Check if token exist
    if(!token){
        return res.status(401).json({msg: 'authorization denied'})
    }
     
    //Verify token 
    try{
        const decode = jwt.verify(token, config.get('jwtSecret') );
        req.user = decode.user;
        next()
    }catch(err){
        return res.status(401).json({msg: 'Token is not validauthorization denied'});
    }

}