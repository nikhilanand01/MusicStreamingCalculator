import React from 'react';
import Select from 'react-select';

class MarketingDropDown extends React.Component {

  state = {
    selectedOption: this.props.selectedOption,
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
      }),
      singleValue: (provided, state) => ({
        ...provided,
        fontSize: '12px',
        color: 'black'
      }),
      placeholder: (provided, state) => ({
        ...provided,
        fontSize: '10px'
      }),
      indicatorsContainer: (base) => ({
        ...base,
        padding: 0
      }),
      dropdownIndicator: base => ({
          ...base,
          padding: 0
      }),
      clearIndicator: base => ({
          ...base,
          padding: 0
      }),
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

export default MarketingDropDown;
