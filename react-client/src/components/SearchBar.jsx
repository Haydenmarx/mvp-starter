import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searching : '',
      userTitle : 'title'
    }
    this.updateState = this.updateState.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }
  updateState (e) {
    this.setState({searching: e.target.value})
  }

  updateSearch() {
    console.log('click')
    if (this.state.userTitle === 'user') {
      console.log(this)
      this.setState({userTitle: 'title'})
    } else {
      console.log('user')
      this.setState({userTitle: 'user'})
    }

  }

  render () {
    return(
      <div>
        <label>Load by {this.state.userTitle === 'user' ? <span onClick= {this.updateSearch}>USER</span> : <span onClick= {this.updateSearch}>TITLE</span>}: </label>
        <input value={ this.state.searching } onChange={ this.updateState } />
        <button onClick={()=>{this.props.searchByParam(this.state.searching)}}>Search</button>
        <button className={'newPaper'} onClick={ this.props.addPaper } >New Paper</button>
      </div>
    )
  }
}

export default SearchBar;