import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searching : ''
    }
    this.updateState = this.updateState.bind(this);
  }
  updateState (e) {
    this.setState({searching: e.target.value})
  }
  render () {
    return(
      <div>
        <label>Load: </label>
        <input value={ this.state.searching } onChange={ this.updateState } />
        <button onClick={()=>{this.props.searchByParam(this.state.searching)}}>Search</button>
        <br />
        <button onClick={ this.props.addPaper } >New Paper</button>
      </div>
    )
  }
}

export default SearchBar;