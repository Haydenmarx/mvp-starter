import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      saved : true
    }
    this.setSave = this.setSave.bind(this);
  }

  setSave(){
    if (this.state.saved) {
      this.setState({saved : false});
    } else {
      this.setState({saved : true});
    }
  }

  render () {
    return(
      <div className="paper">
      <h1>{ this.props.paper.title }</h1>
        <i className="fa fa-times fa-2x" aria-hidden="true" onClick={ ()=>{this.props.removePaper(this.props.index)}} ></i>
        {this.props.paper.saved === true ?
          <i className="fa fa-floppy-o fa-2x" aria-hidden="true" style={{color:'green'}} ></i>
        :
          <i className="fa fa-floppy-o fa-2x" aria-hidden="true" style={{color:'red'}} onClick={ ()=>{console.log(this.props);this.props.savePaper(this.props.paper.title, this.props.paper.body, this.props.paper.id)}} ></i>
        }
      <textarea value={ this.props.paper.body } onChange={ (e)=>{this.props.updateBody(e, this.props.index); } } ></textarea>
    </div>
    )
  }
}

export default ListItem;