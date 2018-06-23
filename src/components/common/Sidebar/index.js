import React from "react";
import {Link} from "react-router-dom";
import "./index.css";
const Sidebar = ({menuItems,selectedMenuItem,onMenuItemClick}) => {
  return (
    <div style={{height:0}}>
      <ul id="slide-out" className="side-nav side-nav-override fixed">
        {
          menuItems.map((menuItem,menuItemKey)=>{
            return (
              <li key={menuItemKey}>
                <Link className={`${selectedMenuItem===menuItemKey?"selected-tab":""}`} to={menuItem.to} onClick={()=>{
                    onMenuItemClick(menuItemKey)
                }}><span className={`icon-span ${selectedMenuItem===menuItemKey?"selected-tab-icon":""}`}><i className={`material-icons material-icons-override`}>{menuItem.icon}</i></span><span className="font16 icon-displayName">{menuItem.displayName}</span></Link>
              </li>
            )
          })
        }
      </ul>
      <a href="" data-activates="slide-out" className="button-collapse menu-icon-override">
        <i className="material-icons">menu</i>
      </a>
    </div>
  );
};

export default Sidebar;
