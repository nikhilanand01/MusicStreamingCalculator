import React from 'react';
import Select from 'react-select';

class SingleDropDown extends React.Component {

  state = {
    // selectedOption: this.props.selectedOption,
    selectedOption: null
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
        defaultValue={this.props.defaultValue}
      />
    );
  }
}

export default SingleDropDown;
