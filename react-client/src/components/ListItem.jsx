import React from 'react';
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      saved : true,
      close : false,
      editTitle : false,
      unSavedTitle: props.paper.title
    }
    this.setSave = this.setSave.bind(this);
    this.setClose = this.setClose.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  setSave(){
    if (this.state.saved) {
      this.setState({saved : false});
    } else {
      this.setState({saved : true});
    }
  }

  setClose(){
    if (this.state.close) {
      this.setState({close : false});
    } else {
      this.setState({close : true});
    }
  }

  setTitle(revert){
    if (this.state.editTitle) {
      this.setState({editTitle : false});
    } else {
      this.setState({editTitle : true});
    }
    if(revert) {
      this.setState({title : this.props.title});
    }
  }

  updateTitle(e) {
    console.log(this.state);
    this.setState({unSavedTitle : e.target.value});
  }

  render () {
    return(
    <div className="paper">
      { this.state.close === true ?
        <div className="deletePaper">
          <i className="fa fa-times fa-4x" aria-hidden="true" onClick={this.setClose}></i>
          <h2>Close <button onClick={()=>{this.props.removePaper(this.props.index)}} >the file</button> or <button>delete entirely</button>?</h2>
        </div>
      : 
        <span></span>
      }
      {this.state.editTitle === false ?
        <h1 onClick={this.setTitle} >{ this.props.paper.title }</h1>
      : 
        <div className="titleInput" ><input value={ this.state.unSavedTitle } onChange={(e)=>{this.updateTitle(e)}} /><button onClick={(e)=>{this.props.updateBody(e, this.props.index, 'title', this.state.unSavedTitle); this.setTitle(true)}}>Update</button><button onClick={()=>{this.setTitle(false)}} >Revert</button></div>
      }
        <i className="fa fa-times fa-2x" aria-hidden="true" onClick={this.setClose} ></i>
        {this.props.paper.saved === true ?
          <div>
            <i className="fa fa-floppy-o fa-2x" aria-hidden="true" style={{color:'green'}} ></i>
            <i className="fa fa-undo fa-2x unSaved" aria-hidden="true"></i>
          </div>
        :
          <div>
            <i className="fa fa-floppy-o fa-2x" aria-hidden="true" style={{color:'red'}} onClick={ ()=>{this.props.savePaper(this.props.paper.title, this.props.paper.body, this.props.paper.id, this.props.index, this.props.cb)}} ></i>
            <i className="fa fa-undo fa-2x" aria-hidden="true"></i>
          </div>
        }
      <textarea value={ this.props.paper.body } onChange={ (e)=>{this.props.updateBody(e, this.props.index, 'body'); } } ></textarea>
    </div>
    )
  }
}

export default ListItem;