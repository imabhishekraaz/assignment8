const express = require('express');
const app = express();

const { rateLimit } = require('express-rate-limit');
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
app.get("/", (req,res)=> {
    res.status(200).json({
        message: "Abhishek RAj"
    })
})

app.listen(4000,()=> {
    console.log("server is running on http://localhost:4000")}
);