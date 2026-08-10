import express from "express";
import router from "./modules/post/post.router";

const app = express();

app.use(express.json());

app.use("/post", router)

app.get('/',(req,res)=>{
    res.send("Bismillahir Rahmanir Rahim")
})


export default app;
