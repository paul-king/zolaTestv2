import React from 'react';

export class UserCard extends React.Component {
	render () {
    return (
      <div id={this.props.id} className="user-card" priority={this.props.priority} card-cat={this.props.category} >
      	<h2 className="name">{this.props.name}</h2>
      	<div className="age">{this.props.age}</div>
      	<div className="cateogry">{this.props.category}</div>
      </div>
    );
  }
}