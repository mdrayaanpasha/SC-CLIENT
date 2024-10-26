import axios from "axios";
import { useState } from "react";

//components
import Nav from "../non-routed-comps/nav";

//assets
import img from "../../assets/img/sofa-page/sofa-cat-l.jpg";
import "../../assets/css/auth.css";

function Register() {
  const [form, setForm] = useState(true);
  const [otp, setOtp] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    shippingAddress: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const reg = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      number: formData.number,
      password: formData.password,
      shippingAddress: formData.shippingAddress,
    };

    try {
      const response = await axios.post(
        "https://api-sc-pgsn.onrender.com/reg",
        data
      );
      console.log(response.data.otp);
      console.log(response.data);
      if (response.data.message === "there") {
        alert("you are already registered to our platform!");
        window.location.href = "./login";
      }
      setOtp(response.data.otp);
      setForm(false);
    } catch (error) {
      console.log(error);
      alert("There is an error in backend");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    console.log(typeof otp);
    const o = parseInt(e.target.otp.value, 10);
    if (o === otp) {
      const data = {
        name: formData.name.toLowerCase(),
        email: formData.email.toLowerCase(),
        number: formData.number,
        shippingAddress: formData.shippingAddress,
        password: formData.password,
      };
      try {
        const R = await axios.post(
          "https://api-sc-pgsn.onrender.com/confirmReg",
          data
        );
        if (R.data.message === "done") {
          localStorage.setItem("D", formData.email);
          const redirectURL = localStorage.getItem("redirect");
          if (redirectURL) {
            window.location.href = redirectURL;
          } else {
            window.location.href = "/";
          }
        } else {
          console.log("we believe you are already there in our db");
        }
      } catch (error) {
        console.log("sorry internal error");
      }
    } else {
      setMessage("Wrong Otp,please check your latest email!");
    }
  };

  return (
    <>
      <Nav></Nav>
      {form ? (
        <div className="div-d">
          <div className="div-d-img">
            <img src={img} alt="" loading="lazy" />
          </div>
          <form onSubmit={reg}>
            <center>
              <h3 className="theme">Register!</h3>
            </center>
            {/* this is email input */}
            <div class="mb-3">
              <label for="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* this is name input */}

            <div class="mb-3">
              <label for="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="eg: John Green"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* this is password feild */}

            <div class="mb-3">
              <label for="password" className="form-label">
                Create Your Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* this is number feild */}
            <div class="mb-3">
              <label for="number" className="form-label">
                Phone No:{" "}
              </label>
              <input
                type="number"
                name="number"
                className="form-control"
                placeholder="eg: 8232332122"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>

            <div class="mb-3">
              <label for="shippingAddress" class="form-label">
                Shipping Adress
              </label>
              <textarea
                class="form-control"
                name="shippingAddress"
                rows="3"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            {message && <p>{message}</p>}
            <center>
              <input type="submit" className="btn" value="Register" />
              <p>
                Already have an account?<a href="/login">Login</a>
              </p>
            </center>
          </form>
        </div>
      ) : (
        <div className="div-d">
          <div className="div-d-img">
            <img src={img} alt="" />
          </div>
          <form onSubmit={verifyOtp}>
            <div class="mb-3">
              <label for="otp" className="form-label">
                Enter OTP (find it in your email):{" "}
              </label>
              <input
                type="number"
                name="otp"
                className="form-control"
                required
              />
            </div>
            {message && <p>{message}</p>}
            <center>
              <input type="submit" className="btn btn-primary" value="Verify" />
            </center>
          </form>
        </div>
      )}
    </>
  );
}

export default Register;
