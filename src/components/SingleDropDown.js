import React, { Component } from 'react';
import Select from 'react-select';

{/*
  const labelDealOptions = [
  { value: 'royalty', label: 'Royalty' },
  { value: 'netProfit', label: 'Net Profit' },
  { value: 'distributionPercent', label: 'Distribution (%)' },
  { value: 'distributionFee', label: 'Distribution (fee)' },
  { value: 'labelServices', label: 'Label Services' }
]

const pubDealOptions = [
  { value: 'FullTraditional', label: 'Full/Traditional' },
  { value: 'co-publising', label: 'Co-publising' },
  { value: 'admin', label: 'Admin' },
  { value: 'noDeal', label: 'No Deal' }
]
*/}


class SingleDropDown extends React.Component {sendData = () => {
  this.props.parentCallBack(this.state.selectedOption)
}

  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}

export default SingleDropDown;
