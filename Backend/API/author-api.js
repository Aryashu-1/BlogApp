//create author mini express app
const exp = require('express');
const authorApp = exp.Router();
const bcryptjs = require('bcryptjs')
const expressAsyncHandler= require('express-async-handler')
const  jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifytoken')
//importing coommon app
const coommonApp = require('./common-api');
require('dotenv').config();
authorApp.use(exp.json())

let authorcollection ;
let articlescollection;
//get author collection app
authorApp.use((req,res,next)=>{
    authorcollection= req.app.get('authorscollection')
    articlescollection = req.app.get('articlescollection')
    next();
})




//get request handler
authorApp.get('/authors',(req,res)=>{
    res.send({"message":"authors list", "payload":"authors"})
})



//author registration route
authorApp.post('/author',expressAsyncHandler(async (req,res)=>{
    const newauthor = req.body;

 //checking for duplicate author
 const dbauthor =  await authorcollection.findOne({userName : newauthor.userName})
 
 //if author found in db i.e already existing
 if(dbauthor !== null){
     res.send({"message": "author already exists"})
 }
 else{
     //hash password
         const hashedpassword = await bcryptjs.hash(newauthor.password,6)
     //replace plain pass with hashed pass
     newauthor.password = hashedpassword;
     //create new author
     await authorcollection.insertOne(newauthor)
     //rsend response
     res.send({'message': "author created successfully"})
 }

}))


//author login  handler
authorApp.post('/login', async (req,res)=>{
    //get cred obj
    const authorCred = req.body;
    //check for authorname
    let dbauthor = await authorcollection.findOne({authorName:authorCred.authorName})
    if(dbauthor === null){
            res.send({"message":"authorname not found"})
    }
    else{
        //check for pass
        const status = await bcryptjs.compare(authorCred.password,dbauthor.password)
        if(status === false){
            res.send({"message":"invalid password"})
        }
        else{
            //create jwt token and encode it
                const signedToken = jwt.sign({"authorname": dbauthor.authorName},process.env.SECRET_KEY,{expiresIn:20})
            //send response
                res.send({"message":"Login Succesfull","token":signedToken,"author":dbauthor})
        }
    
    }
    

})

//add new article by author 
authorApp.post('/article',verifyToken,expressAsyncHandler(async (req,res)=>{
        const newArticle = req.body;
        //posting to articles collection
         await articlescollection.insertOne(newArticle);
         // send respose
         res.send({"message":"article added successfully"})
    
}))

//mdify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedArticle = req.body;
    //update by author
    let result = await articlescollection.updateOne({articleID:modifiedArticle.articleID},{$set:modifiedArticle})
    console.log(result)
    res.send({"message": "Article modified successfully"})
}))

//deleting article y id
authorApp.put('/article/:articleID',verifyToken,expressAsyncHandler(async (req,res)=>{
    let articleIDfromURL = req.params.articleID;
    console.log(articleIDfromURL)
    let deletedArticle = req.body;
    //update article
    let result = await articlescollection.updateOne({articleID: deletedArticle.articleID},{$set:{...deletedArticle,"status":false}})
    console.log(result)
    //send response
    res.send({"message":"Article deleted successfuly"})
}))

//get articles by author name
authorApp.get('/article/:authorName',verifyToken,expressAsyncHandler(async (req,res)=>{
    let authorNamefromURL = req.params.authorName;
    //search for articles by authorname
    let articlesofAuthorfromURL = await articlescollection.find({username: authorNamefromURL,status:true}).toArray()
    res.send({"message":"Articles of {$`authorNamefromURL`}","payload": articlesofAuthorfromURL})
}))

//exporting
module.exports = authorApp;