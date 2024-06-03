import axios from "axios";
import { useState } from "react";
import Nav from "./nav";
import img from "./img/sofa-cat/sofa-cat-l.jpg"

function Register() {
  const [form, setForm] = useState(true);
  const [otp, setOtp] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    shippingAddress: "",
    password:"",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const reg = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      number: formData.number,
      password: formData.password,
      shippingAddress: formData.shippingAddress
    };

    try {
      const response = await axios.post("http://localhost:3000/reg", data);
      console.log(response.data.otp);
      setOtp(response.data.otp);
      setForm(false);
    } catch (error) {
      console.log(error);
      alert("There is an error in backend");
    }
  };

  const verifyOtp = async(e) => {
    e.preventDefault()
    
    console.log(typeof(otp))
    const o = parseInt(e.target.otp.value,10);
    if(o===otp){
      const data = {
        name: formData.name.toLowerCase(),
        email: formData.email.toLowerCase(),
        number: formData.number,
        shippingAddress: formData.shippingAddress,
        password:formData.password
      };
      try {
        const R = await axios.post("http://localhost:3000/confirmReg",data);
        if(R.data.message === "done"){
          localStorage.setItem("D",formData.email)
          const redirectURL = localStorage.getItem("redirect");
          if (redirectURL) {
            window.location.href = redirectURL;
          } else {
            window.location.href = "/";
          }
        }else{
          console.log("we believe you are already there in our db")
        }
      } catch (error) {
        console.log("sorry internal error")
      }
    }else{
      setMessage("Wrong Otp,please check your latest email!")
    }
  };

  return (
    <>
    <style>
      {`
      .div-d{
        display:flex;
        align-items:center;
        margin-top:5vh;
        border:1px solid silver;
        margin-left:15vw;
        margin-right:15vw;
        border-radius:2vw;
        

      }
      .div-d img{
        width:30vw;
        margin-right:15vw;
        
        border-radius:2vw 0vw 0vw 2vw;
        height:80vh;
        
      }
      h3{
        margin-bottom:3vh;
      }
      .btn{
        background-color:#82C2C9;
        box-shadow: 5px 5px 15px #82C2C9;
        color:white;
        margin-bottom:1vh;
      }
      .btn:hover{
        color:#82C2C9;
        border:2px solid #82C2C9;
      }
      .theme{
        color:#82C2C9;
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
      {form ? (
        <div className="div-d">
          <div className="div-d-img">
          <img src={img} alt="" />
          </div>
        <form onSubmit={reg}>
         <center><h3 className="theme">Register!</h3></center> 
          {/* this is email input */}
          <div class="mb-3">
            <label for="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" placeholder="name@example.com" value={formData.email}
            onChange={handleChange}
            required/>
          </div>



          {/* this is name input */}

          <div class="mb-3">
            <label for="name" className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" placeholder="eg: John Green" value={formData.name}
            onChange={handleChange}
            required/>
          </div>
          
          {/* this is password feild */}

          <div class="mb-3">
            <label for="password" className="form-label">Create Your Password</label>
            <input type="password" name="password" className="form-control" placeholder="" value={formData.password}
            onChange={handleChange}
            required/>
          </div>
          
          {/* this is number feild */}
          <div class="mb-3">
            <label for="number" className="form-label">Phone No: </label>
            <input type="number" name="number" className="form-control" placeholder="eg: 8232332122" value={formData.number}
            onChange={handleChange}
            required/>
          </div>
          
          <div class="mb-3">
            <label for="shippingAddress" class="form-label">Shipping Adress</label>
            <textarea class="form-control" name="shippingAddress" rows="3" value={formData.shippingAddress}
            onChange={handleChange} required></textarea>
          </div>
          {message && <p>{message}</p>}
         <center><input type="submit" className="btn" value="Register" /></center> 
         <p>Already have an account?<a href="/login">Login</a></p>
        </form>
        </div>
      ) : (
        
           <div className="div-d">
          <div className="div-d-img">
          <img src={img} alt="" />
          </div>
          <form onSubmit={verifyOtp}>
          <div class="mb-3">
            <label for="otp" className="form-label">Enter OTP: </label>
            <input type="number" name="otp" className="form-control" required />
          </div>
          {message && <p>{message}</p>}
           <center><input type="submit" className="btn btn-primary" value="Verify" /></center> 
          </form>
         
        </div>
      )}
    </>
  );
}

export default Register;
