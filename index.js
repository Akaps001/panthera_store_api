const express = require("express");
const api = express();

api.get('/',(req,res)=>{
    return res.status(200).json({
        message:"welcome"
    })
})


api.listen(4040,()=>{
    console.log("api connected to port 4040")
})