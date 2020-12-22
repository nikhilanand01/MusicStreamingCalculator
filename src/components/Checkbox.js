import React from 'react';
import '../stylesheets/Checkbox.css';

class Checkbox extends React.Component {

	render() {
		return (
        <label className="check-container">
  			  <input
            type={"checkbox"}
            onChange = {this.props.onChange}
            checked={this.props.checked}
          />
          <span class="checkmark"></span>
        </label>
      );
	}
}


export default Checkbox;
