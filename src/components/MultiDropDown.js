import React from 'react';
import Select from 'react-select';


class MultiDropDown extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        defaultValue={this.props.options[0]}
        isMulti
        name="labelServices"
        options={this.props.options}
        className="basic-multi-select"
        classNamePrefix="Select Services"
        styles={{
          menu: provided => ({ ...provided, zIndex: 10 })
          }}
      />
    );
  }
}

export default MultiDropDown;
