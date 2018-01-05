import React from 'react';
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      close : false,
      editTitle : false,
      editBody : false,
      savedTitle: props.savedTitle,
      unSavedTitle: props.paper.title,
      savedBody: props.paper.body,
      unSavedBody: props.paper.body
    }
    this.setClose = this.setClose.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setBody = this.setBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  setClose(){
    if (this.state.close) {
      this.setState({close : false});
    } else {
      this.setState({close : true});
    }
  }

  setTitle(){
    if (this.state.editTitle) {
      this.setState({editTitle : false});
    } else {
      this.setState({editTitle : true});
    }
  }

  setBody(revert){
    if(revert) {
      this.setState({unSavedBody : this.state.savedBody});
      this.setState({unSavedTitle : this.state.savedTitle})
      this.props.cb(this.props.index);
    }
  }

  updateTitle(e) {
    this.setState({unSavedTitle : e.target.value});
  }

  updateBody(e) {
    this.setState({unSavedBody : e.target.value});
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
        <h1 onClick={this.setTitle} >{ this.state.unSavedTitle }</h1>
      : 
        <div className="titleInput" ><input value={ this.state.unSavedTitle } onChange={(e)=>{this.updateTitle(e)}} /><button onClick={(e)=>{this.props.updateBody(e, this.props.index, 'title', this.state.unSavedTitle); this.setTitle()}}>Update</button><button onClick={()=>{this.setTitle()}} >Revert</button></div>
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
            <i className="fa fa-undo fa-2x" aria-hidden="true" onClick={()=>{ this.setBody('revert'); }}></i>
          </div>
        }
      <textarea value={ this.state.unSavedBody } onChange={ (e)=>{this.updateBody(e); this.props.updateBody(e, this.props.index, 'body', this.state.unSavedTitle); } } ></textarea>
    </div>
    )
  }
}

export default ListItem;

/*
value={ this.state.unSavedBody } 
onChange={ (e)=>{this.updateBody(e);} ></textarea>


value={ this.state.unSavedTitle } 
onChange={(e)=>{this.updateTitle(e)}} 
onClick={(e)=>{
  this.props.updateBody(e, this.props.index, 'title', this.state.unSavedTitle); 
  this.setTitle()}
}

onClick={()=>{this.setTitle()}}

*/