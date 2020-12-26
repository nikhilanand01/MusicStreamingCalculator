import React from 'react';
import Select from 'react-select';


class MultiDropDown extends React.Component {
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

    return (
      <Select
        defaultValue={this.props.default}
        isMulti
        name="labelServices"
        onChange={this.handleChange}
        placeholder="Select Label Services..."
        options={this.props.options}
        className="basic-multi-select"
        styles={{
          menu: provided => ({ ...provided, zIndex: 10 })
          }}
      />
    );
  }
}

export default MultiDropDown;
