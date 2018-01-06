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
    this.updateBodyTitle = this.updateBodyTitle.bind(this);
    this.removePaper = this.removePaper.bind(this);
    this.savePaper = this.savePaper.bind(this);
    this.successfulSave = this.successfulSave.bind(this);
    this.deletePaper = this.deletePaper.bind(this);
  }

  addPaper() {
    let temp = this.state.papers.slice();
    temp.push({'title' : 'Add title', 'body' : 'Add paper', 'saved' : false})
    this.setState({papers : temp});
  }

  removePaper(index) {
    // let temp = this.state.papers.slice();
    //this.state.papers = [{key: value, key: value},{}]
    // temp.splice(index, 1);

    // temp.splice(index, 1);
    // temp = [temp[0], temp[0]];

    // temp = temp.map((paper, i) =>{
    //   if (i !== index) {
    //     return paper;
    //   }
    // }).filter(paper => paper !== undefined);
    // var lis = $('.paper')
    // for (var x=0; x<x.length; x++) {
    //   lis[x].remove;
    // }
    // this.setState({testArr : temp});
    // this.setState({papers : temp});
  }

  componentDidMount() {
    $.ajax({
      url: '/papers', 
      success: (data) => {
        data = data.map(datum=>{
          datum.saved = true;
          return datum;
        })
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
      method: "get",
      data: title, 
      success: (data) => {
        data = data.map(datum=>{
          datum.saved = true;
          return datum;
        })
        this.setState({
          papers: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  savePaper(title, body, id='new', index) {
    $.ajax({
      url: '/papers',
      method: "post",
      contentType : "application/json",
      data: JSON.stringify({
        'title': title,
        'body' : body,
        'id' : id
      }), 
      success: (data) => {
        console.log('success: ', data, ' ', this);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  deletePaper(id='new', index) {
    $.ajax({
      url: '/papers',
      method: "put",
      contentType : "application/json",
      data: JSON.stringify({
        'id' : id
      }), 
      success: (data) => {
        console.log('success: ', data, ' ', this);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  successfulSave(index) {
    let temp = this.state.papers.slice();
    temp[index].saved = true;
    this.setState({papers : temp});
  }

  updateBody(e, index) {
    let temp = this.state.papers;
    temp[index].body = e.target.value;
    this.setState({papers : temp});
    temp = this.state.papers;
    temp[index].saved = false;
    this.setState({papers : temp});
  }

  updateBodyTitle(e, index, bt, val) {
    let temp = this.state.papers;
    if (val) {
      temp[index][bt] = val;
    } else {
      temp[index][bt] = e.target.value;
    }
    this.setState({papers : temp});
    temp = this.state.papers;
    temp[index].saved = false;
    this.setState({papers : temp});
  }

  render () {
    return (
      <div>
        <h1>Text Editor with Cats?</h1>
        <SearchBar searchByParam= {this.searchByParam} addPaper = {this.addPaper}/>
        {this.state.papers.length === 0
        ?
          <span></span>
        :
          <List papers={this.state.papers} updateBody = {this.updateBodyTitle} removePaper={this.removePaper} savePaper={this.savePaper} successfulSave={this.successfulSave} addPaper = {this.addPaper} delete={this.deletePaper} />
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
