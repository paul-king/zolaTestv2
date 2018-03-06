import React from 'react';
import { UserCard } from './UserCard';
import { RadioFilter } from './RadioFilter';

import importedData from '../data/data.json';

export class UserGrid extends React.Component {
  constructor(props){
    super(props);

    let activeFilter = false;

    this.state = {
      users: [],
      categories: []
    };

    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillMount() {
    this.setState({ users: importedData.data });
  }

  componentDidMount() {
    // if you try to do this in componentWillMount, categories ends up as undefined
    let uniqueCategories = [...new Set(this.state.users.map(user => user.category))];
    this.setState({ categories: uniqueCategories.sort() });
  }

  handleRadioChange(e) {
    let filter = e.target.value;
    let allCards = document.querySelectorAll('div.user-card');
    let targetedCards = document.querySelectorAll('div[card-cat="' + filter + '"]');
    let removeFilter = document.getElementById('filter-remove');

    // Step 1: hide all user-cards
    allCards.forEach(card => {
      card.classList.add("hidden");
    });

    // Step 2: unhide cards in the selected category
    targetedCards.forEach(card => {
      card.classList.remove("hidden");
    });

    // Bonus: Added a remove filter(s) option
    if (this.activeFilter) {
      if(filter === 'none') {
        allCards.forEach(card => {
          card.classList.remove("hidden");
          removeFilter.classList.add("hidden");
        });
        this.activeFilter = false;
      }
    } else {
      removeFilter.classList.remove("hidden");
      this.activeFilter = true;
    }
  }

  handleSelectChange(e) {
    let sortValue = e.target.value;
    
    this.setState({
      users: this.state.users.sort((a, b) => a[sortValue] > b[sortValue])
    });
  }

  render () {
    return (
      <div className="user-grid__wrap">
        <div className="user-grid__controls">
          <div className="user-grid__sort">
            <label>Sort by (ascending): </label>
            <select id="sort" className="user-grid__sort-options" onChange={this.handleSelectChange} >
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="user-grid__filter">
            <label>Filter by: </label>
            { 
              this.state.categories.map((category) => {
                return (
                  <RadioFilter key={category} value={category} text={category} onChange={this.handleRadioChange} />
                )
              })
            }
            <div id="filter-remove" className="filter__wrap hidden">
              <input type="radio" name="filter" value="none" onChange={this.handleRadioChange} /> <span className="filter__text">remove filter(s)</span>
            </div>
          </div>
        </div>
        <div className="user-grid">
          {
            this.state.users.map((user) => {
              let uniqueID = user.name + user.age + user.category; // Data has no unique ID's, make one using other props (bad idea to simply use index values)

              return <UserCard key={uniqueID} id={uniqueID} name={user.name} age={user.age} category={user.category} priority={user.priority} />
            })
          }
        </div>
      </div>
    );
  }
}