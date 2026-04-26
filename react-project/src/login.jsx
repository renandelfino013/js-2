import {useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login (){
    let [statusresp, setestatusresp] = useState("");
    const navigate = useNavigate();
    let [email, setemail] = useState("");
let [senha, setsenha] = useState("");
if(localStorage.getItem("token")){
    navigate("/Home");
}
 async function handlelogin(){
    try{
    let response = await fetch("http://localhost:3000/usuarios/login",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email, senha})

        


    }) 
    console.log(response.status)
     let  data = await response.json();
     console.log(data)

     
    if ( await response.status === 404||  await response.status === 500) {
             setestatusresp(true);
        }
        else if( await response.status === 200){
     const payload = JSON.parse(atob(data.token.split(".")[1]))

        localStorage.setItem("token", JSON.stringify(await data.token))
        localStorage.setItem("nome", JSON.stringify(await payload.nome))
        setestatusresp(false);
        navigate(`/Home`);}
       
}
    catch(error){
        console.error("Erro ao fazer login:", data.error);
    }
}

return(
    <div className="login-container">
        <h1>Login</h1>
        <input type="email" placeholder="email"  name="email" required onChange={(e) => setemail(e.target.value)}/>
        <input type="password" placeholder="Password"  required name="senha" onChange={(e) => setsenha(e.target.value)}/>
        <button onClick={handlelogin}>Login</button>
        {statusresp && <p className="error-message">Login falhou. Verifique suas credenciais e tente novamente.</p>}
        <a  onClick={() => navigate("/register")} href="/register">Não tem uma conta? Cadastre-se aqui</a>
    </div>
)
}
export default Login