const { userInfo } = require("os");

async function postdata(){
try{
    const user_inputs={
            email: document.getElementById("email").value ,
            name : document.getElementById("name").value ,
            password : document.getElementById("password").value 
    }
    if(!user_inputs.email || !user_inputs.name || !user_inputs.password){
        return document.getElementById("register_output").innerHTML=`please enter valid credentials`
    }
    const response = await fetch("http://localhost:3000/postdata",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(user_inputs)
    })
    const data = await response.text()
    document.getElementById("register_output").innerHTML=data;
}
catch(err){
    console.log(err)
}
}

async function getdata(){
try{
    const response = await fetch("http://localhost:3000/userdata")
    if(!response.ok){
        throw new Error(`err`)
    }
    const data = await response.json();
    document.getElementById("printdata").innerHTML=JSON.stringify(data);
}
catch(err){
    console.log(err)
}
}

async function updatedata(){
try{
     const user_inputs={
           email: document.getElementById("resetemail").value ,
              oldpassword: document.getElementById("oldpassword").value,
              newpassword:document.getElementById("newpassword").value
    }
    if(!user_inputs.email || !user_inputs.oldpassword || !user_inputs.newpassword){
        return document.getElementById("forgetpassword").innerHTML=`please enter valid credentials`
    }
     const response = await fetch("http://localhost:3000/updatedata",{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(user_inputs)
    })
    const data = await response.text()
    document.getElementById("forgetpassword").innerHTML=data;

}
catch(err){
    console.log(err)
}
}

async function deleteuser(){
try{
      const user_inputs={
            email: document.getElementById("delete_email").value,
              password: document.getElementById("deletepassword").value
    }
    if(!user_inputs.email || !user_inputs.password){
        return document.getElementById("deleteuser").innerHTML=`please enter valid credentials`
    }
     const response = await fetch("http://localhost:3000/deletedata",{
        method:"delete",
        headers:{
            "content-type":"application/json"
        },
         body:JSON.stringify(user_inputs)
    })
      const data = await response.text()
      document.getElementById("deleteuser").innerHTML=data;
}
catch(err){
    console.log(err)
}
}