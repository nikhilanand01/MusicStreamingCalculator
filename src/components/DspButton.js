/* eslint-env browser, commonjs, jquery, es6 */

import React from 'react';
import '../stylesheets/DspButton.css';
import SmallText from './SmallText';


class DspButton extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      button: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({
      button:!this.state.button

    })
  }

  testButton(){
    console.log("DSP - MAKE VALUE TOGGLE ON/OFF")
  }

  render(){
    return (
    <div className="container">
      <button className={this.state.button ? "buttonTrue": "buttonFalse"} 
            onClick={() => {
            this.handleClick();
            this.testButton();
            }}>
        PASS IN DSP NAME HERE
      </button>
    </div>
    )
  }
}

export default DspButton;
