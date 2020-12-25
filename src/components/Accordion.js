import React from 'react';
import SmallText from './SmallText';
import '../stylesheets/Accordion.css';

class Accordion extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen: false
		}
	}

	toggleAccordion = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	render() {
		return (
			<div className="accodion-container" style={{marginTop: '2%'}}>
				<section id="accodion" className={(this.state.isOpen) ? 'open' : 'close'}>
					<div onClick={this.toggleAccordion}>
					 <SmallText text={this.props.title} style={{marginTop: '-8px'}} />
					 <p className="icon" onClick={this.toggleAccordion}>{(this.state.isOpen) ? '-' : '+'}</p>
					</div>
					 <div>{this.props.body}</div>
		  	</section>
			</div>
	    );
	}
}

 export default Accordion;
