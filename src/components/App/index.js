import React, { Component } from "react";
import routes from "routes";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import menuItems from "../../constants/menuItems";
// import $ from "jquery";
import "./index.css";
import "assets/styles/App.css";


class App extends Component {
  state={
    selectedMenuItem:2,
    logo:"https://prod-tms-app.s3.amazonaws.com/uploads/logo/hul.png"
  }

  componentDidMount=()=>{
    // Initialize collapse button
    // $(".button-collapse").sideNav();
  }

  handleMenuItemClick=(selectedMenuItem)=>
  {
    console.log(selectedMenuItem);
    this.setState({
      selectedMenuItem
    })
  }

  render() {
    const {handleMenuItemClick}=this;
    const {selectedMenuItem,logo}=this.state;
    return (
      <div className="container-fluid">
        <Header logo={logo}/>
        <Sidebar menuItems={menuItems} selectedMenuItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick}/>
        <div className="content">{routes}</div>
      </div>
    );
  }
}

export default App;
