const express = require('express')
const router =express.Router();
const authController = require('../controllers/authController.js');



router.get('/signup' , (req,res)=>{
    //use controller here
    authController.signup_get(req,res);
});
router.post('/signup' , (req,res)=>{
    console.log("signup post req received")
    authController.signup_post(req,res);
});
router.get('/login' , (req,res)=>{
    authController.login_get(req,res);
});
router.post('/login' , (req,res)=>{
    authController.login_post(req,res);
});
router.get('/logout', (req,res)=>{
    authController.logout_get(req,res)
})


module.exports=router;