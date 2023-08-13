const jwt = require('jsonwebtoken');


module.exports =(req, res, next)=>{
    let Token = req.headers['token-key'];
    jwt.verify(Token , 'SecretKey12345', (err,decode)=>{

        if(err){
            console.log("Token",Token)
            res.status(401).json({status:'Unauthorized'})
        }
        else {
               //let Email = decode['data'];
            req.headers.email = decode['data'];
            next();
        }
    })
}