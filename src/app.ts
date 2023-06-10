import express,{Application} from "express";
import cors from "cors"
import router from "./controllers/itemController";
import { checkAuthentication } from "./models/db";

const app:Application = express()

app.use(cors(),express.json(),express.urlencoded({extended:false}))

checkAuthentication()

app.use("/",router)

app.listen(5000,()=>{
    console.log("Listening on port 5000")
})
