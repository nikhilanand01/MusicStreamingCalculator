import React from "react";
// import { render } from "react-dom";
import "../stylesheets/NumberInput.css";
import NumberFormat from 'react-number-format';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    };
  }
  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: 0 });
  }

  handleKeyPress(event) {
    // console.log(this.state.value)
  }

  render() {
    const { active, value, error, label} = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <NumberFormat
          type={this.props.type}
          value={value}
          placeholder={label}
          maxLength={11}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
          min="1"
          max={this.props.max}
        />
        <label htmlFor={0} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}

export default NumberInput;
