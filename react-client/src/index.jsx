import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import SearchBar from './components/SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      papers: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/papers', 
      success: (data) => {
        this.setState({
          papers: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  searchByParam(title) {
    $.ajax({
      url: '/papers',
      data: title, 
      success: (data) => {
        this.setState({
          papers: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <SearchBar searchByParam= {this.searchByParam} />
      <List papers={this.state.papers} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));