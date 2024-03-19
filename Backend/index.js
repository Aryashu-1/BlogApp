
const exp = require('express');
const app = exp();
const path = require('path')

//deploy react app
app.use(exp.static(path.join(__dirname,'../Client/blog/build')))


require('dotenv').config() //process(gobal object)

//mongo client
const mongoClient =require('mongodb').MongoClient;



//connecting to db 
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db object
    const blogdb = client.db('blogdb')
    //get collection
    const userscollection = blogdb.collection('userscollection');
    const articlescollection = blogdb.collection('articlescollection');
    const authorscollection = blogdb.collection('authorscollection')
    //share collection obj with express app
    app.set('userscollection',userscollection)
    app.set('articlescollection',articlescollection)
    app.set('authorscollection',authorscollection)
    //cofirming connection
    console.log("Connected to DB")
})
.catch(err=>{
    console.log("Error in connecting to db", err)
    
})

//parse body of request
app.use(exp.json())
//importing api routes
const adminApp = require('./API/admin-api');
const userApp = require('./API/user-api')
const authorApp = require('./API/author-api')


//if path starts with /user-api use user API
app.use('/user-api',userApp)

//if path starts with /author-api use user API
app.use('/author-api',authorApp)

//if path starts with /admin-api use user API
app.use('/admin-api',adminApp)

//refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../Client/blog/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({"message": "error","payload":err.message })
})




//assigning port number
const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log("Server started on port: ",port)})