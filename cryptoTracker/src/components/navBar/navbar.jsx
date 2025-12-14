import React, { useContext, useState } from "react";
import "./navbar.css";
import logo from "../../assets/logo2.png";
import { coinContext } from "../../context/coinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(coinContext);
  const [open, setOpen] = useState(false);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      case "inr":
        setCurrency({ name: "inr", Symbol: "₹" });
        break;
      case "eur":
        setCurrency({ name: "eur", Symbol: "€" });
        break;
      default:
        setCurrency({ name: "usd", Symbol: "$" });
    }
  };

  return (
    <div className="navbar">
      <div className="img">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="menu" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={open ? "active" : ""}>
        <Link to="/"><li>Home</li></Link>
        <li><a href="#">Features</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Blog</a></li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button className="sign-up">Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
