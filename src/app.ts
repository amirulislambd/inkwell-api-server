import express from "express";
import router from "./modules/post/post.router";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL || "http//localhost:4000",
    credentials: true,
  }),
);

app.use("/post", router)

app.get('/',(req,res)=>{
    res.send("Bismillahir Rahmanir Rahim")
})


export default app;
