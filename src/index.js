import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express"
import cors from "cors"
// import blog, { blog } from "./models/user.model.js"
import {Blog} from "./models/user.model.js";


const app = express();
app.use(express.json());

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";

dotenv.config({
    path: './env'
})

connectDB() 
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
})


//home route
app.get('/', (req,res) => {
    res.send("Hello from Node API server updated");

});


//creating blog
app.post('/create_blog', async(req,res) => {
    try{
        console.log(req.body)
         const {title, content} = req.body;
         console.log(title,content)
        const blog = await Blog.create(req.body);
        res.status(200).json(blog);

    } catch(err) {
        console.log(err);
        res.status(500).json({message:"api failed"});
    }
});

//getting all blogs
app.get('/get_blogs', async (req,res) => {
    
    try{
        const blog = await Blog.find({});
        res.send({count:blog.length, data:blog});

    } catch(err) {
        console.log(err);
        res.status(500).send({message:"api connection failed !!"});
    }
})