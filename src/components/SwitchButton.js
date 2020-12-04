import React from "react";
import Switch from "react-switch";

class SwitchButton extends React.Component {
  constructor() {
    super();
    this.state = {checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div>
        <switch
          className="react-switch"
          onChange={this.handleChange}
          checked={this.state.checked}
        />
      </div>
    );
  }
}

export default SwitchButton;
