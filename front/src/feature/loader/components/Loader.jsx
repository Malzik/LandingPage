import React from 'react';
import './Loader.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LoaderComponent extends React.Component {
  render() {
    const { loading } = this.props;

    if (loading === 0) return null;

    return (
      <div className="loader">
        <div className="lds-hourglass" />
      </div>
    );
  }
}

LoaderComponent.propTypes = {
  loading: PropTypes.number,
};

LoaderComponent.defaultProps = {
  loading: 0,
};

const mapStateToProps = state => ({
  loading: state.loading,
});

const Loader = connect(mapStateToProps)(LoaderComponent);

export { LoaderComponent, Loader };
