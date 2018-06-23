import React from "react";
import $ from "jquery";

class UiDatePicker extends React.Component {
  componentDidMount() {
    let { id , handleChange } = this.props;
    this.initDatePicker();
    $(`#${id}`).on("change", function(e) {
      handleChange(id, e.target.value);
    });
  }

  initDatePicker = () => {
    let { id } = this.props;
    $(`#${id}`).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      today: "Today",
      clear: "Clear",
      close: "Ok",
      closeOnSelect: true, // Close upon selecting a date
      container: undefined // ex. 'body' will append picker to body
    });
  };

  componentDidUpdate() {
    this.initDatePicker();
  }

  render() {
    let { containerClass, id, placeholder} = this.props;
    return (
      <div className={`${containerClass}`}>
        <input
          id={id}
          type="text"
          className="datepicker"
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default UiDatePicker;
