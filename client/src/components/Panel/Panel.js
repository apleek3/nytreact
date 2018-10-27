import React from 'react';

export const Panel = (props) => (
  <div className="panel panel-info" {...props}>
    {props.children}
  </div>
)
