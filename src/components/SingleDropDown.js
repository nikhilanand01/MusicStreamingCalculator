import React, { Component } from 'react';
import Select from 'react-select';
import styled from "styled-components";

class SingleDropDown extends React.Component {

  state = {
    selectedOption: null,
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };


  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }


  render() {
    const { selectedOption } = this.state;

    const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 10
    })
  }

    return (
      <Select
        styles={customStyles}
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}

export default SingleDropDown;
