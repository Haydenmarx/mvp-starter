import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    {/* <h4> List Component </h4>
    There are { props.papers.length } papers, the top {props.papers.length<4 ? props.papers.length : 3} are {props.papers.map((paper, i)=>{
      if (i < 2 && i < props.papers.length-1) {
        return paper.title + ', ';
      } else if (i<3) {
        return paper.title + '.';
      }
    })} */}
    {/* <button onClick={ props.addPaper } >New Paper</button> */}
    { props.papers.map((paper, index) => <ListItem paper={paper} savedTitle={paper.title} key= {index} index={index} updateBody = {props.updateBody} removePaper={props.removePaper} savePaper={props.savePaper} cb={props.successfulSave} delete={props.delete} />)}
  </div>
)

export default List;