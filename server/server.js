import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app= express()

await connectDB()

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => res.send("API is working Properly"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
// app.get('/favicon.ico', (req, res) => res.status(204).end());



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})

export default app;