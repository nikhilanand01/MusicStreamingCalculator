import React, { Component } from "react";
import Switch from "react-switch";


export default class SwitchButton extends Component {

  render() {
    return (
      <div>
        <label>
        <Switch
          checked={this.props.checked}
          onChange={this.props.onChange}
          onColor="#CEDAF9"
          onHandleColor="#366FF6"
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
