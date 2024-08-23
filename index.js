
import express from "express";
import dbConnection from "./config/db.js";
import routerCourse from "./routes/courseRoutes.js";
 import routerTask from "./routes/taskRoutes.js";
//import router from "./routes/routes.js";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port = process.env.PORT||8000;

app.use(cors())

app.use(express.json())
app.use('/courses',routerCourse);
app.use('/courses',routerTask)

app.get('/',async(req,res)=>{
    res.send("<h1>Welcome to the student task portal</h1>")
})

app.listen(port,()=> console.log(`Server is listening at http://localhost:${port}`))
