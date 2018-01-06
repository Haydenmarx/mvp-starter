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
      unSavedBody: props.paper.body,
      removed : false,
      saved : true
    }
    this.setClose = this.setClose.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setBody = this.setBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.saveToDb = this.saveToDb.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.unsaved = this.unsaved.bind(this);
  }

  setClose(){
    if (this.state.close) {
      this.setState({close : false});
    } else {
      this.setState({close : true});
    }
  }

  // componentDidUpdate(){
  //   // console.log(this.props, this.state) 
  //   console.log(this.state.unSavedBody, this.props.paper.body)
  //   if (this.state.unSavedBody !== this.props.paper.body) {
  //     this.setState({savedBody: this.props.paper.body, unSavedBody: this.props.paper.body});
  //   }
  // }

  setTitle(){
    if (this.state.editTitle) {
      this.setState({editTitle : false});
    } else {
      this.setState({editTitle : true});
    }
  }

  setBody(revert){
    if(revert) {
      this.setState({unSavedBody : this.state.savedBody, unSavedTitle : this.state.savedTitle});
      this.setState({saved : true});
      console.log(this.state);
    }
  }

  updateTitle(e) {
    this.setState({unSavedTitle : e.target.value});
  }

  updateBody(e) {
    this.setState({unSavedBody : e.target.value});
  }

  saveToDb() {
    this.props.savePaper(this.state.unSavedTitle, this.state.unSavedBody, this.props.paper.id, this.props.index);
    this.setState({savedBody : this.state.unSavedBody, savedTitle : this.state.unSavedTitle, saved : true});    
  }
  
  removeItem() {
    this.setState({removed : true});
  }

  unsaved() {
    this.setState({saved : false});
  }

  render () {
    return(
  <div>
    {this.state.removed === true ?
      <span></span>
        :
    <div className="paper">
    {/* {console.log(this.props.paper.body, this.state.unSavedBody)} */}
      { this.state.close === true ?
        <div className="deletePaper">
          <i className="fa fa-times fa-4x" aria-hidden="true" onClick={this.setClose}></i>
          <h2>Close <button onClick={()=>{this.setClose(); this.removeItem(); this.props.removePaper(this.props.index)}} >the file</button> or <button onClick={()=>{this.props.delete(this.props.id, this.props.index) }} >delete entirely</button>?</h2>
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
        {this.state.saved === true ?
          <div>
            <i className="fa fa-floppy-o fa-2x" aria-hidden="true" ></i>
            <i className="fa fa-undo fa-2x unSaved" aria-hidden="true"></i>
          </div>
        :
          <div>
            <i className="fa fa-floppy-o fa-2x" aria-hidden="true" style={{color:'red'}} onClick={ this.saveToDb } ></i>
            <i className="fa fa-undo fa-2x" aria-hidden="true" onClick={()=>{ this.setBody(true); }}></i>
          </div>
        }
      <textarea value={ this.state.unSavedBody } onChange={ (e)=>{this.updateBody(e); this.props.updateBody(e, this.props.index, 'body', this.state.unSavedTitle); this.unsaved()} } ></textarea>
    </div>
}
</div>
    )
  }
}

export default ListItem;