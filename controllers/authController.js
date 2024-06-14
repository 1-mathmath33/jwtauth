const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
//handle errors with a function
const handleErrors = (err)=>{
    console.log(err.message, err.code);
}
const maxAge = 10 // this expects time in seconds, UNLIKE cookie that expects it in milliseconds
const createToken = (id)=>{
    // return jwt.sign({id} , 'this is a secret being used for a jwt token' , {
    //     expiresIn : maxAge
    // });
    return jwt.sign({id} , 'this is a secret being used for a jwt token' )
}
const signup_get= (req,res)=>{
    res.render('signup' ,{title : 'Signup'});
}
const signup_post= (req,res)=>{
   const { email, password} = req.body;
   console.log('email is ')
   console.log(req.body.email)
   const user= new User({
    email : email,
    password : password
   });
   
   user.save().then((result)=>{
    
    const token = createToken(user._id)
   // res.cookie('jwt', token, {httpOnly: true , maxAge : maxAge* 1000});
    res.cookie('jwt', token, {httpOnly: true })
    res.status(201).json({ user : user._id})
    }).catch((err)=>{handleErrors(err) , res.status(400).send(err)})
}
const login_get= (req,res)=>{
    
    res.render('login' , {title: 'Login'});
}
const login_post= async function(req,res){
    const {email , password} = req.body
    console.log(email, password)
  
        //need to create our own LOGIN method on the MODEL as mongoose doesnt have a login method inbuilt
    try{
       // console.log('login request received 1 ')
        const user = await User.login(email,password)
       // console.log(user)
       const token = createToken(user._id)
       res.cookie('jwt', token, {httpOnly: true , maxAge : maxAge* 1000});
        res.status(200).json({user: user._id})
    }catch(err)
    {
       handleErrors(err)
        res.status(400).send(err)
    }
 //  console.log('login request received2 ')
}
const logout_get= async function(req,res)
{
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('/')
}
module.exports={
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}