import React from 'react';

const ListItem = (props) => (
  <div>
    {console.log(props)}
    <h1>{ props.paper.title }</h1>
    <textarea value={ props.paper.body } ></textarea>
  </div>
)

export default ListItem;