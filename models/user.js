const _= require('lodash');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator = require('validator');
const bcrypt= require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true,'Enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email entered']
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        minlength: [6 , 'minimum password length is 6']
    }
})

// userSchema.post('event_name_that_occurs' , function(document_which_was_deleted_or_saved , next){})

//fire a function after doc saved to DB
 
userSchema.post('save', function(doc, next){  //doc is the thing that was created 
    console.log('new user created :' , doc);
    next();
})

//fire function before doc saved to DB

userSchema.pre('save', async function(next){  //not using doc because nothing has been saved yet, this is a 'pre' event
    //console.log('user: ', this) // 'this' is unavailable in arrow function
    //hashing password
    const salt= await bcrypt.genSalt(); //this is async
    this.password= await bcrypt.hash(this.password, salt)
    next();
})

//static method to login the user 
            //here this refers to the user model itself
    userSchema.statics.login = async function(email,password){
      //  console.log('In static method')
        const user=await this.findOne({email : email});                         // in static method 'this' refers to model
        if(user)
            {
            const auth= await bcrypt.compare(password, user.password)
            if(auth)
                {
                    return user
                }
                throw Error('Incorrect Password')

            }
        throw Error('Incorrect Email')
    }

const User = mongoose.model('User', userSchema);
module.exports=User;