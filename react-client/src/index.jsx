import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

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
        console.log(data);
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
      <List papers={this.state.papers}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));