const jwt = require("jsonwebtoken");
const express= require('express');
const router= express.Router();
//const {db} = require(".././app")
const bcrypt = require('bcryptjs');
const User=require('../model/userSchema');

router.get('/',(req,res)=>{
    res.send('Hello world router js');  
});


router.post('/register',async(req,res)=>{
    const{name,email,phone,work,password,cpassword}=req.body;

    if (!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'Fill the field'});
    }

    try{
        
        //first email is email in database, right one is the one which user fills
        
        const userExist= await User.findOne({email:email});  //if email gets repeated 

        if(userExist){
            return res.status(422).json({error:'email user already exists'});
        }else if(password != cpassword){
            return res.status(422).json({error:'Password not matching'});
        }else{
            const user = new User({name,email,phone,work,password,cpassword});
            //hash passwords before saving ,,, pre save in user schema

            await user.save();
            res.status(201).json({message:'user registered success'});

        }

        
        
         




        //const userRegister = await user.save();
                    // await user.save();
       // console.log(userRegister);

                    // res.status(201).json({message:'user registered success'});
        
        // if (userRegister){
        //     res.status(201).json({message:'user registered success'});
        // }else{
        //     res.status(500).json({error:"failed to register"})
        // }
    }catch(err){
        console.log(err);
    }
});


//using promises
// router.post('/register',(req,res)=>{
//     const{name,email,phone,work,password,cpassword}=req.body;
//     if (!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:'Fill the field'});
//     }
//     //first email is email in database, right one is the one which user fills
//     User.findOne({email:email})//if email gets repeated 
//         .then((userExist)=>{
//             if(userExist){return res.status(422).json({error:'User already exists'});}
//         const user=new User({name,email,phone,work,password,cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message:'user registered success'})    
//     }).catch((err)=>res.status(500).json({error:"failed to rregister"}));
//     }).catch(err=>{console.log(err);});


//     //console.log(cpassword);
//     //console.log(req.body.name);
//     //res.json({message:req.body});    
//     //res.send('my registration page');

// });



//login route after reistration

router.post('/signin',async(req,res)=>{
    try{
        //check for validation 
        // 1. both email and password should not be empty
        // 2. the email should exist in our registration details database
        // 3. password should match
        // but password should be hashed first 

        let token;// global 
        const {email,password}=req.body;
        if (!email || !password){
            return res.status(400).json({error:"Plz fill the data"})
        }

        const userLogin = await User.findOne({email:email});
        console.log(userLogin);


        if (userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password); 
            //jwt 

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true
            });
            //return token;
            //to check if input password matches wiyth hashed password record from our data
            if (!isMatch){
                res.status(400).json({error:"Invalid Credentials"});// print it in postman when details are wrong and Null is printed on console
            }else{
                res.json({message:"User Signin Successful"});
            }    
        }else{
            res.status(400).json({error:"Invalid Credentials"});
        }

        

    }catch(err){
        console.log(err);
    }


    // console.log(req.body);
    // res.json({message:"awesoeme"});
})




module.exports= router;