import React from 'react';

import './Input.scss';

const input = (props) => {
  let inputElement = null;

  switch(props.proptype) {    
    case ('input'):
      inputElement = <input {...props} />;
      break;
    case ('textarea'):
      inputElement = <textarea {...props} />;
      break;
    default:
      inputElement = <input {...props} />;
  }

  return (
    <div className="input-holder">
      <label htmlFor={props.labelfor}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input;
