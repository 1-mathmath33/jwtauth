const jwt = require('jsonwebtoken');
const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log('YOOOOOOOo')
    //checking if token is present or not
    if(token)
        {
            jwt.verify(token, 'this is a secret being used for a jwt token' , (error, decodedToken)=>{
                if(error){
                    console.log(error)
                    res.redirect('/login')

                }else
                {   
                    console.log('VERIFIED!')
                    console.log(decodedToken)
                    next();
                }
            })
        }
    else
    {
        res.redirect('/login')
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt
    
    if(token)
        {
            jwt.verify(token, 'this is a secret being used for a jwt token' , (error, decodedToken)=>{
                if(error){
                    console.log(error)
                    res.redirect('/login')

                }else
                {   
                    console.log('VERIFIED!')
                    console.log(decodedToken)
                    next();
                }
            })
        }
    else{

    }
}

module.exports = { requireAuth };