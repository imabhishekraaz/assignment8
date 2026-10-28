import express from 'express';
const app = express();
import { config } from 'dotenv'
import rateLimit from 'express-rate-limit';
import { Error } from './middlewares/Error.middleware.js';
import { connectDatabase } from './utils/db.js';
import dns from 'dns';
import { userRouter } from './routes/user.route.js';


dns.setServers(["0.0.0.0", "1.1.1.1"]);
config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 20, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})

app.use(limiter);

// JSON middleware
app.use(express.json());

// app routes and request at the "/" URL"
app.get("/api/v1", (req,res)=> {
    res.status(200).json({
        message: "Abhishek RAj"
    })
})
app.use("/api/v1", userRouter);

// connect the database
connectDatabase();


// error middleware 
app.use(Error);

app.listen(4000,()=> {
    console.log("server is running on http://localhost:4000")}
);