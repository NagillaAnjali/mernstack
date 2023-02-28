//const { time, timeStamp } = require('console');
const jwt= require("jsonwebtoken");
const mongoose= require('mongoose');
const bcrypt= require("bcryptjs");
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required: true
            }
        }
    ]
    

})



//we are hashing the password
userschema.pre('save',async function(next){
    //console.log("hi from inside");
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password,12);
        this.cpassword =await bcrypt.hash(this.cpassword,12);
    }
    next();
})


//we are generating jwt
userschema.methods.generateAuthToken = async function(){
    try{
        let token= jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        //console.log(token)
        //expires user token in 30 days
        // save to cookie
        
    }catch(err){
        console.log(err);
    }
}


//collection creation
const User= mongoose.model('USER',userschema);
//exported user after we hash password
module.exports=User;

