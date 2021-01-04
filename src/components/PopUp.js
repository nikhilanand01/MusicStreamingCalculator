import React from 'react';
import '../stylesheets/Popup.css';
import SmallText from './SmallText.js';

class Popup extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPopup: false
		}
	}

	togglePopup = () => {
		this.setState({
			showPopup: !this.state.showPopup
		})
	}


  render() {
    return (
      <div>
        <div onClick={this.togglePopup.bind(this)}>
          <SmallText text={this.props.buttonText} className='buttonText'/>
        </div>
        {this.state.showPopup ?
          <div className='popup' onClick={this.togglePopup}>
            <div className='popup-inner'>
              <h1 className="title">{this.props.title}</h1>
              <p className="body-text">{this.props.body}</p>
            <button onClick={this.togglePopup}>close</button>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}


export default Popup;
