require("dotenv").config()
const express = require('express')
const cors = require("cors")
const data = require('../backend/movies.json')
const app = express()
const MovieRouter = require("./Routes/Movie")
const mongoose = require("mongoose")


app.use(cors({
    origin :["https://search-filter-rvb3.vercel.app/"]
    methods :["POST","GET"],
    credentials:true
}))
app.use(express.json())

const port = process.env.PORT||8080

app.use('/api',MovieRouter)
// mongoose.connect(process.env.MONGO)


// .then(()=>{
//     console.log("DEVELOPMENT IN PROGRESS");
    
// })
// .catch((err)=>{
//     console.log(err);
    
// })
mongoose.connect("mongodb+srv://search1:search123@cluster0.a4ydfce.mongodb.net/?retryWrites=true&w=majority")


app.get('/',(req,res)=>{
    res.json("Hello")
})
app.listen(port,()=>{

    console.log(`Listening on PORT${port}..`);
    

})
