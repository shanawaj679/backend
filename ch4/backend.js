const express = require ("express")
const app = express()
const mysql = require ("mysql2")
const cors = require ("cors")
const bcrypt = require("bcryptjs")
app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Shanawaj@#$8123",
    database:"practice"
})
db.connect((err)=>{
    if(err){
        console.log(`db connection failed : ${err}`)
    }
    console.log(`db connection successfull`)
})
app.get("/userdata",async (req,res)=>{
    try{
           const [rows] =await db.promise().query("select email,name from loginpage")
           res.json(rows);
    }
    catch(err){
        console.log(err)
    }
})

app.post("/postdata",async (req,res)=>{
    try{
         const {email,name,password}=req.body;
    const cryptedpassword = await bcrypt.hash(password,10)
    const [already_existing_user] = await db.promise().query("select email from loginpage where email= ?",[email])
    if(already_existing_user.length>0){
        return res.send("user already exists")
    }
    const [rows] =await db.promise().query("insert into loginpage(email,name,password) values(?,?,?)",[email,name,cryptedpassword])
    res.send("registration successfull")
    }
    catch(err){
        console.log(err)
        res.send("server.error")
        }
})

app.put("/updatedata", async (req,res)=>{
    try{
        const {email,oldpassword,newpassword}=req.body;
        const cryptedpassword = await bcrypt.hash(newpassword,10);
        const [already_existing_user]= await db.promise().query("select email,password from loginpage where email = ?",[email])
        if(already_existing_user.length===0){
            return res.send("user not exists");
        }
        else if(await bcrypt.compare(oldpassword,already_existing_user[0].password)){
             const [rows] = await db.promise().query("update loginpage set password = (?) where email = (?)",[cryptedpassword,email])
             res.send("password change successfully");
        } 
    }
    catch(err){
        console.log(err)
    }
})

app.delete("/deletedata",async (req,res)=>{
    try{
         const {email,password}=req.body;
         const [rows] = await db.promise().query("select password from loginpage where email = ?",[email])
         if(rows.length === 0){
            return res.send("user not found")
         }
         const existing_user_password =rows[0].password;
         const compare = await bcrypt.compare(password,existing_user_password);
         if(compare){
            await db.promise().query("delete from loginpage where email = ?",[email])
            res.send(`user is deleted bearing email = ${email}`)
         }
    }
    catch(err){
        console.log(err)
    }
})
app.listen(3000,()=>{
    console.log("server is running on port no 3000")
})