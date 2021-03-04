import React from 'react';
import '../stylesheets/Circle.css';

class Circle extends React.Component {

	render() {
		return (
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<span class={this.props.class}></span>
		  	<p class="legendtext">{this.props.text}</p>
			</div>
      );
	}
}

export default Circle;
