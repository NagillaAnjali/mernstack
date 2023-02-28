const mongoose= require('mongoose');
const {connectToDb, getDb} = require("./db")
const { ObjectId } = require('mongodb')

const dotenv= require("dotenv");
dotenv.config({path:"./config.env"});

const express = require('express');
const app= express();

//require('./db/conn');
const User= require('./model/userSchema');

app.use(express.static('urlencoded()'))
app.use(express.json());//it is a middleware as our app doesnt understand json , us use json.stringify or json.parse   ,,, with out this , we get undefined 

//link router files to make connection easy







let db;
connectToDb((err)=>{
    if (!err) {
        console.log("Database connection successful");
        console.log("Listening For Requests")
        app.listen(3000);
        db = getDb();
    } else {
        console.log(err);
        console.log("error connecting to DB");
    }
});



app.use(require('./router/auth'));



//middleware
//to check for authentication



// const middleware=(req,res,next)=>{
//     console.log('hellow middleware');
//     next();
// }
// middleware();



// .get(path, callback) we are routing and listening if the particular port is running with some url path mentioned
app.get('/',(req,res)=>{
    res.send('Hello world');  
});


app.get('/contact',(req,res)=>{
    res.cookie("Test","jwtcookie");//add cookies to site information in url 
    res.send('Hello contact');  
});

// app.get('/about',middleware,(req,res)=>{
//     res.send('Hello about');  
//     console.log('hellow about');
// });
app.get('/signin',(req,res)=>{
    res.send('Hello signin');  
});
app.get('/register',(req,res)=>{
    res.send('Hello registration');  
});
// app.listen(5000,()=>{
//     console.log('server is running at port 3000');
//  });


module.exports = {db};