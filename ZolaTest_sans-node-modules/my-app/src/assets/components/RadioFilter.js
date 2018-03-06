import React from 'react';

export class RadioFilter extends React.Component {
	render () {
    return (
	  	<div className="filter__wrap" >
	    	<input type="radio" name="filter" value={this.props.value} onChange={this.props.onChange} /> <span className="filter__text">{this.props.text}</span>
	  	</div>
    );
  }
}