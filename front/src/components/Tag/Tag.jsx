import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

class Tag extends React.Component {
  render() {
    const { type, children, onClick, onMouseLeave, onMouseEnter } = this.props;
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
}

Tag.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

Tag.defaultProps = {
  type: 'badge-light',
  onClick: () => {},
  onMouseLeave: () => {},
  onMouseEnter: () => {},
};

export { Tag };
