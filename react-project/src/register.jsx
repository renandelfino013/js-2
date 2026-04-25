import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";



function Register (){
    const navigate = useNavigate();
    let [email, setemail] = useState("");
let [senha, setsenha] = useState("");
let [username, setusername] = useState("");

async function handleregister(){
try {
  let response = await fetch("http://localhost:3000/usuarios/",{
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({email, senha, username})


    

})
if(response.status === 200){

        let data = await response.json();
        const payload = JSON.parse(atob(data.token.split(".")[1]))

        localStorage.setItem("token", JSON.stringify(data.token))
        localStorage.setItem("nome", JSON.stringify(payload.nome))
        
    } 
}        
catch(error){
    console.error("Erro ao fazer login:", error);
}


}
    
 
    
    
    
    
    return(
        <div className="register">
            <h1>Sing-up
            </h1>
            <input type="email" placeholder="email"  name="email" required onChange={(e) => setemail(e.target.value)}/>
            <input type="password" placeholder="Password"  required name="senha" onChange={(e) => setsenha(e.target.value)}/>
            <input type="text" placeholder="nome de usuario "required onChange={(e) => setusername(e.target.value)} />
            <button onClick={handleregister} onKeyDown={(e) => e.key === "Enter" && handleregister()}>Register</button>

            
            <a href="/">Já tem uma conta? Login</a>
        </div>
    )
}
                                                          

export default Register