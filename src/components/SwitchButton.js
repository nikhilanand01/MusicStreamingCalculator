import React, { Component } from "react";
import Switch from "react-switch";

/*        <p>
          <span>{this.state.checked ? 'Recoupable' : 'Non-Recoupable'}</span>
        </p>*/

export default class SwitchButton extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }


  render() {
    return (
      <div>
        <label>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#eb7060"
          onHandleColor="#f7371e"
          handleDiameter={25}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={15}
          width={40}
        />
        </label>
      </div>
    );
  }
}
