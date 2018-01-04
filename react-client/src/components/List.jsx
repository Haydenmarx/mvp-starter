import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.papers.length } papers.
    { props.papers.map((paper, index) => <ListItem paper={paper} key= {index} />)}
  </div>
)

export default List;