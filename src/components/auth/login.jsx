import axios from "axios";
import { useState } from "react";

//components
import Nav from "../non-routed-comps/nav";

//media assets
import img from "../../assets/img/sofa-page/sofa-cat-l.jpg";
import "../../assets/css/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the login logic here
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const E = email.toLowerCase();
      const R = await axios.post("https://api-sc-pgsn.onrender.com/login", {
        Email: E,
        Password: password,
      });
      if (R.data.message === "Pass") {
        const E = email.toLowerCase();
        localStorage.setItem("D", E);
        const redirectURL = localStorage.getItem("redirect");
        if (redirectURL) {
          window.location.href = redirectURL;
        } else {
          window.location.href = "/";
        }
      } else if (R.data.message === "Fail") {
        setMessage("Wrong Passsword");
      } else {
        setMessage("user doesnt");
      }
    } catch (error) {
      alert("there is an error in frontend");
    }
  };

  return (
    <>
      <Nav></Nav>
      <div className="div-d">
        <div className="div-d-img">
          <img src={img} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <h3 className="theme">Login!</h3>
          <div class="mb-3">
            <label for="email" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <center>
            <input type="submit" value="Login" className="btn" />
            <p>
              Dont have an account? <a href="/reg">Register!</a>
            </p>
          </center>
        </form>
        {message ? <p>Message: {message}</p> : <></>}
      </div>
    </>
  );
}

export default Login;
