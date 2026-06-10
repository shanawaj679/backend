const express=require("express");
const app=express();
const cors=require("cors");
const mysql=require("mysql2");
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"my_password",
    database:"shane"
})
db.connect((err)=>{
    if(err){
        console.log("connection failed", err);
    }
    else{
        console.log("database connection successful");
    }
})
app.get("/employee",async(req,res)=>{
    try{
         const [rows] = await db.promise().query("select * from employee");
         res.json(rows);
    }
    catch(err){
        throw new Error(`database query error: ${err}`)
    }
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})