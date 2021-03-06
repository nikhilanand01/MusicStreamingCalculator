import React from 'react';
import '../stylesheets/SelectButton.css';



class SelectButton extends React.Component {
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


  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }


  render(){
    return (
    <div className="container">
      <button className={this.state.button ? "buttonTrue": "buttonFalse"}
            onClick={() => {
            this.handleClick();
            }}>
        {this.props.text}
      </button>
    </div>
    )
  }
}

export default SelectButton;
