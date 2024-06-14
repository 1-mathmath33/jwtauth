const express= require('express');
const morgan =require('morgan');
const authRoutes= require('./routes/authRoutes.js')
const app=express();
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware.js');

app.use(morgan('dev')) ; 


const dbURI="mongodb+srv://1-mathmath33:almbiivi123@atlascluster.miyhqef.mongodb.net/node-auth?retryWrites=true&w=majority&appName=AtlasCluster"
mongoose.connect(dbURI).then(console.log('DB connected') , app.listen(3000));
app.use(cookieParser()); // now we can access a cookie method on the response object 
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
//view engine
app.set('view engine' , 'ejs');

app.use(express.json()); //converts the input that comes with a request to JSON 
//routes
app.use(authRoutes)
app.get('/' , (req,res)=>{
  res.render('home' , {title: 'HOME' , name: "mathmath33"})
})
app.get('/smoothies',  requireAuth , (req,res)=>{

 
  res.render('smoothies' , {title : 'HOME'})
})

app.use((req,res)=>{
  res.json({
    msg: '404 not found'
  })
})


module.exports=app;
/**
 * Mongoose hook: Special function that fires after a mongoose event happens, example: we can make functions that fire after deletion from DB or updation form DB, etc
 * 
 */

// app.get('/set-cookies', (req,res)=>{
//   // res.setHeader('Set-Cookie', 'newUser=true'); //cookie value has a name&value, here name= newUser, value= true
 
//    //using the methods of cookieParser
//          res.cookie('newUser' , false ) ; //name of cookie, value of property , options object for cookie : maxAge of a cookie
//                                                                // in milliseconds , httpOnly:true -> then cookie values cant be accessed from frontend of a console by document.cookie
//          res.cookie('isEmployee', true , {maxAge : 1000 * 60*60*24 , httpOnly:true});
 
//    res.send('cookies!');
//  })
 
//  app.get('/read-cookies', (req,res)=>{
//            //we can access cookies on request object due to presence of cookie parser
//            const cookies=req.cookies
//            console.log(cookies.newUser);
 
//            res.json(cookies)
//  })