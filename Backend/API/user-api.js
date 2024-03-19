//create user mini express app
const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs')
const expressAsyncHandler= require('express-async-handler')
const verifyToken = require('../Middlewares/verifytoken')
const  jwt = require('jsonwebtoken')
//importing coommon app
const coommonApp = require('./common-api');

require('dotenv').config();
userApp.use(exp.json())

let userscollection ;
let articlescollection;
//get user collection app
userApp.use((req,res,next)=>{
    userscollection= req.app.get('userscollection')
    articlescollection = req.app.get('articlescollection')
    next();
})



//get request handler
userApp.get('/users',(req,res)=>{
    res.send({"message":"users list", "payload":"users"})
})

//user registration route
userApp.post('/user',expressAsyncHandler(async (req,res)=>{
    const newUser = req.body;

 //checking for duplicate user
 const dbUser =  await usercollection.findOne({userName : newUser.userName})
 
 //if user found in db i.e already existing
 if(dbUser !== null){
     res.send({"message": "user already exists"})
 }
 else{
     //hash password
         const hashedpassword = await bcryptjs.hash(newUser.password,6)
     //replace plain pass with hashed pass
     newUser.password = hashedpassword;
     //create new user
     await userscollection.insertOne(newUser)
     //rsend response
     res.send({'message': "user created successfully"})
 }

}))


//user login 
userApp.post('/login', async (req,res)=>{
    //get cred obj
    const userCred = req.body;
    //check for username
    console.log(userCred)
    let dbuser = await userscollection.findOne({userName:userCred.username})
    if(dbuser === null){
            res.send({"message":"username not found"})
    }
    else{
        //check for pass
        const status = await bcryptjs.compare(userCred.password,dbuser.password)
        if(status === false){
            res.send({"message":"invalid password"})
        }
        else{
            //create jwt token and encode it
                const signedToken = jwt.sign({"username": dbuser.userName},process.env.SECRET_KEY,{expiresIn:20})
            //send response
                res.send({"message":"Login Succesfull","token":signedToken,"user":dbuser})
        }
    
    }
    

})

//get articles of all users
userApp.get('/articles',verifyToken,expressAsyncHandler(async (req,res)=>{
    //get articles from articles collection
    const articlescollection  = req.app.get('articlescollection')
    let articlesList = await articlescollection.find({status:true}).toArray()
    //send response
    res.send({"message":"Articles","payload":articlesList})
}))

//adding comments to articles by articleID
userApp.post('/comment/:articleid',verifyToken,expressAsyncHandler(async (req,res)=>{
    let userComment = req.body;
    let articleIDfromURL = req.params.articleid;
    //add comments
    let result = await articlescollection.updateOne({articleId:articleIDfromURL},{$addToSet:{comments:userComment}})
    console.log(result)
    //send response
    res.send({"message":"Comments Added"})
}))



//exporting
module.exports = userApp;