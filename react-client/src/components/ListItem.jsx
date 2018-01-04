import React from 'react';

const ListItem = (props) => (
  <div>
    <h1>{ props.paper.title }</h1>
    <textarea>{ props.paper.body }</textarea>
  </div>
)

export default ListItem;