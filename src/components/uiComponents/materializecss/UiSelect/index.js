import React from "react";
import $ from "jquery";



class UiSelect extends React.Component {
  componentDidMount=()=>{
    let {id,handleChange }=this.props;
    this.initUiSelect();
    $(`#${id}`).on('change', 'select', function(e){ handleChange(id,e.target.value) });
  }

  initUiSelect=()=>{
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  componentDidUpdate=()=>{
    this.initUiSelect();
  }
  render()
  {
    let { id, containerClass, code, value,defaultValue, data, placeholder, name} = this.props;

    const dataList = data.map(item => (
      <option key={item[code]} value={item[code]}>
        {item[value]}
      </option>
    ));

    return (
      <div id={id} className={`input-field ${containerClass}`}>
        <select defaultValue={defaultValue?defaultValue:""}>
          <option value="" disabled>
            {placeholder}
          </option>
          {dataList}
        </select>
        <label className="input-label">{name}</label>
      </div>
    );
  }
};

export default UiSelect;
