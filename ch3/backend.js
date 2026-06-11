const express = require("express");
const cors= require("cors");
const mysql = require("mysql2");
const app =express();
app.use(cors());
app.use(express.json());
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Shanawaj@#$8123",
    database:"shane"
})
db.connect((err)=>{
    if(err){
        console.log(`db connection error ${err}`)
    }
    else 
        console.log(`db connected successfully`)
})
app.get("/employee",async(req,res)=>{
    try{
        const [rows] = await db.promise().query("select * from employee");
        res.send(rows);
    }
    catch(err){
          console.log(`error in fetching data from db ${err}`)
    }
})
app.post("/employee",async(req,res)=>{
    try{
        const {eid,ename,eage}= req.body;
        const [result]= await db.promise().query("insert into employee(eid,ename,eage) values(?,?,?)",[eid,ename,eage]);
        res.send(result);
    }
    catch(err){
        throw new Error(`error  in inserting data into db ${err}`)
    }
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})