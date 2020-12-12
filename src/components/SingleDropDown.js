import React, { Component } from 'react';
import Select from 'react-select';
import styled from "styled-components";

class SingleDropDown extends React.Component {

  state = {
    selectedOption: null,
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    //console.log('My state: ', this.state.selectedOption);
  };


  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }


  render() {
    const { selectedOption } = this.state;

    return (
      <Select
      styles={{
        menu: provided => ({ ...provided, zIndex: 10 })
        }}
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}

export default SingleDropDown;
