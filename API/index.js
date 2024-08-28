import responseEnglish from "./routes/responseEnglish.route.js"
import responseRoutes from "./routes/response.route.js"
import express from "express"
import mongoose from "mongoose"
const app = express()
app.use(express.json())
//routes
app.use("/API/Response",responseRoutes)

app.use("/API/Response",responseEnglish)



mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://huzaifa:Studentmongodb4321@cluster0.himkqc6.mongodb.net/AI_touristguide?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> {
    console.log('connected to MongoDB')
}).catch((error)=>{
    console.log(error)
})

app.listen(3000,()=>{
    console.log("listening on " ,3000)
})
