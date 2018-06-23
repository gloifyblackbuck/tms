import React from "react";

class UiCheckBox extends React.Component{

  render()
  {
    let {id,containerClass,labelChildren,handleChange,value}=this.props;
    return (
      <p>
        <input type="checkbox" id={id} onChange={(e)=>{
          handleChange(id,e.target.checked);
        }} checked={value}/>
        <label htmlFor={id} className={containerClass}>
          {labelChildren}
        </label>
      </p>
    )
  }
}

export default UiCheckBox;
