const {MongoClient} = require("mongodb");
const mongoose= require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/mernstack",(err)=>{
    if(!err){console.log('mongoose connection success')}
    else{console.log('Eror in connecting:'+err)}
});

let dbConnection;

module.exports = {
    connectToDb : (cb) => {
        MongoClient.connect("mongodb://0.0.0.0:27017/mernstack")
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err)=> {
            console.log(err);
            return cb(err)
        })
    },
    getDb : ()=> {return dbConnection}
};
