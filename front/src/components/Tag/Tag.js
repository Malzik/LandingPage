import React from 'react';
import './Tag.css';

export const Tag = ({type, children, onClick, onMouseLeave, onMouseEnter}) => {
  const clazz = `badge badge-pill ${type} Tag`;

  return (
      <span
          role="presentation"
          className={clazz}
          onClick={onClick.bind(this)}
          onMouseEnter={onMouseEnter.bind(this)}
          onMouseLeave={onMouseLeave.bind(this)}
      >
        {children}
      </span>
  );
}
