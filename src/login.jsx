import axios from "axios";
import { useState } from "react";
import Nav from "./nav";
import img from "./img/sofa-cat/sofa-cat-l.jpg"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage]=useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle the login logic here
    console.log("Email:", email);
    console.log("Password:", password);

    try {
        const E=email.toLowerCase()
        const R = await axios.post("https://api-sc-pgsn.onrender.com/login",{Email:E,Password:password});
        if(R.data.message==="Pass"){
            const E = email.toLowerCase()
            localStorage.setItem("D",E)
            const redirectURL = localStorage.getItem("redirect");
          if (redirectURL) {
            window.location.href = redirectURL;
          } else {
            window.location.href = "/";
          }
           
        
        }else if(R.data.message==="Fail"){
            setMessage("Wrong Passsword")
        }else{
            setMessage("user doesnt")
        }
    } catch (error) {
        alert("there is an error in frontend")   
    }
    
  };

  return (
    <>
    <style>
      {`
       .div-d{
        display:flex;
        align-items:center;
        justify-content:space-evenly;
        

      }
      .div-d img{
        width:50vw;
        margin-right:15vw;
        
        border-radius:2vw 0vw 0vw 2vw;
        height:auto;
        
      }
      h3{
        margin-bottom:3vh;
      }
      .btn{
        background-color:#655F7F;
        box-shadow: 5px 5px 15px #655F7F;
        color:white;
        margin-bottom:1vh;
      }
      input{
      width:40vw;
      }
      .btn:hover{
        color:#655F7F;
        border:2px solid #655F7F;;
      }
      .theme{
        color:#655F7F;
      }
        form{
        margin-right:3vw;  
        }
      @media(max-width:1000px){
        .div-d{
          display:block;
          padding:3vw;
        }
        .div-d-img img{
          display:hidden;
          height:0;
          width:0;
        }
          

      }
      
      `}
    </style>
    <Nav></Nav>
    <div className="div-d">
      <div className="div-d-img">
      <img src={img} alt="" />
      </div>
    <form onSubmit={handleSubmit}>
      <h3 className="theme">Login!</h3>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" name="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" name="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>
     
      
     <center><input type="submit" value="Login" className="btn" />
     <p>Dont have an account? <a href="/reg">Register!</a></p>
     </center>
    </form>
      {message ? <p>Message: {message}</p> : <></>}
      </div>
      </>
    );
}

export default Login;
