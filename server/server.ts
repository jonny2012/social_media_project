import express, { Application } from "express"
import cors from "cors"
import { configDotenv } from "./node_modules/dotenv/lib/main"
import fileUpload from "express-fileupload"
import allRoutes from "./src/routes/index"
import mongoose from "mongoose"
import path from "path"
configDotenv({ path: ".env" })


const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use("/api",allRoutes)

const URI = process.env?.URI


const appStart = async () => {
    try {
        if (!URI) {
            console.log("Error on connecting to DB")
            return
        }
        mongoose.connect(URI)
        app.listen(process.env.PORT)
    }
    catch (err) {
        console.log(err)
    }
}

appStart()