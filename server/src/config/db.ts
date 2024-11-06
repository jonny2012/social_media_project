import mongoose from "mongoose"
import { configDotenv } from "dotenv"

configDotenv({ path: ".env" })
const URI = process.env.URI

export const dbConnection = async () => {
    try {
        if (!URI) return console.log("Err on connect to db, undefined db link ")
        mongoose.connect(URI)
    }
    catch (err) {
        console.log(err)
    }
}