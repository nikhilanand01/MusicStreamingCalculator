import React from "react";
import { render } from "react-dom";
import {TransitionMotion, spring } from 'react-motion';
import "../stylesheets/NumberInput.css";

class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      // FIX THIS VALUE TO HAVE INPUT BE TRUE... RN "" is so 1 is "" then 12 is "1"
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    };
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: 0 });
  }

  handleKeyPress(event) {
    console.log(this.state.value)
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <input
          id={0}
          type="text"
          value={value}
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={0} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}

export default NumberInput;
