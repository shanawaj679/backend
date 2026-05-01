 const express=require("express");
 const cors=require("cors")
    const app=express();
     app.use(cors({origin: "http://127.0.0.1:3001"}));
    app.get("/",(req,res)=>{
        res.send("Hello world");
    })
    app.listen(3000, () => {
    console.log("Server running on port 3000");
});