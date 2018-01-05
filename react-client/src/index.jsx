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
    this.searchByParam = this.searchByParam.bind(this)
    this.addPaper = this.addPaper.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.removePaper = this.removePaper.bind(this);
  }

  addPaper() {
    let temp = this.state.papers.unshift({'title' : 'Add title', 'body' : 'Add paper'})
    this.setState({data : temp});
  }

  removePaper(index) {
    let temp = this.state.splice(index, 1);
    this.setState({data : temp});
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
    console.log(JSON.stringify({'title' : title}));
    $.ajax({
      url: '/papers',
      method: "get",
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

  updateBody(e, index) {
    let temp = this.state.papers;
    temp[index].body = e.target.value;
    this.setState({papers : temp});
  }

  render () {
    return (
      <div>
        <h1>Item List</h1>
        <SearchBar searchByParam= {this.searchByParam} addPaper = {this.addPaper} />
        <List papers={this.state.papers} updateBody = {this.updateBody} removePaper={this.removePaper} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));