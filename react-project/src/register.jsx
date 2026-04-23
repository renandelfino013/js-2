import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function register (){
    const navigate = useNavigate();
    let [email, setemail] = useState("");
let [senha, setsenha] = useState("");
 
async function handleregister(){
try {
  let response = await fetch("http://localhost:3000/usuarios/register",{
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({email, senha})


    

})
if(response.ok){
        navigate("/Home");
    } 
}        
catch(error){
    console.error("Erro ao fazer login:", error);
}


}
    
    
    
    
    
    
    return(
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="email"  name="email" required onChange={(e) => setemail(e.target.value)}/>
            <input type="password" placeholder="Password"  required name="senha" onChange={(e) => setsenha(e.target.value)}/>
            <button onClick={handleregister}>Register</button>
        </div>
    )
}
                                                          

export default register