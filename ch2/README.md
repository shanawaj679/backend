* here in this priject i am using mysql intigration 
* const mysql=require("mysql2")
* const db=mysql.createConnection{
    host:"localhost",
    user:"root",
    password:"password",
    database:"shane"
}// database connection 
* db.connect((err)=>{
    if(err){
        console.log("connection failed",err)
    }
    else{
        console.log("connection successfull")
    }
  }) // this log is used to check connection of database to backend

* app.get(/employee,async(req,res)=>{
    try{
        const [rows]=await db.promise().query("select * from tablename");
        res.json(rows)
    }
    catch(err){
        throw new Error(`database fetch error ${err}`)
    }
}) // this  is api used to send  data from backend to front end