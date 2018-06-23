import React from "react";

class UiIcon extends React.Component
{
  render()
  {
    let {name,containerClass,containerStyle,size}=this.props;
    return (
      <i
        style={containerStyle}
        className={`material-icons ${containerClass} ${size}`}
      >
        {name}
      </i>
    )
  }
}

export default UiIcon;
