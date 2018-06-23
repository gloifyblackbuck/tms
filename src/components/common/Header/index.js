import React from "react";
import "./index.css";

const Header=({logo})=>{
  return (
    <nav className="nav-override">
    <div className="nav-wrapper nav-wrapper-override">
      <a href="" className="brand-logo brand-logo-override"><img className="logo" alt="logo" src={logo}/>
      </a>
      <ul id="nav-mobile" className="right">
        <li style={{marginRight:"14px"}}>Hi, Bruce Wyane</li>
        <li style={{marginRight:"28px"}}><i className="material-icons">account_circle</i></li>
      </ul>
    </div>
  </nav>
  )
}

export default Header;
