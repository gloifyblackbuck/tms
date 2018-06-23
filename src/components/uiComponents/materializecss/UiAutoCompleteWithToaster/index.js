import React from "react";
import $ from "jquery";

class UiAutoCompleteWithToaster extends React.Component {
  componentDidMount = () => {
    let { id ,handleChange} = this.props;
    $(`#${id}`).on("chip.add", function(e, chip) {
      handleChange(id,chip,"add")
    });
    $(`#${id}`).on("chip.delete", function(e, chip) {
      handleChange(id,chip,"remove")
    });
    this.initUiAutoCompleteWithToaster();
  };

  initUiAutoCompleteWithToaster = () => {
    let { id, code, value, defaultValues, data, placeholder, name } = this.props;
    let autoCompleteData = {};
    for (var i = 0; i < data.length; i++) {
      autoCompleteData[data[i][value]] = null;
    }
    $(document).ready(function() {
      $(`#${id}`).material_chip({
        data: defaultValues,
        placeholder: placeholder,
        secondaryPlaceholder: "+Tag",
        autocompleteOptions: {
          data: autoCompleteData,
          limit: Infinity,
          minLength: 1
        }
      });
    });
  };

  componentDidUpdate = () => {
    this.initUiAutoCompleteWithToaster();
  };

  render() {
    let { id, name, containerClass } = this.props;

    return (
      <div className={`${containerClass}`}>
        <label className="input-label">{name}</label>
        <div className={`chips chips-autocomplete`} id={id} />
      </div>
    );
  }
}

export default UiAutoCompleteWithToaster;
