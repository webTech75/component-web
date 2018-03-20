import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className="app-title-wrapper">
        {
          this.props.title ?
            <h1>{ this.props.title }</h1>
          : ''
        }
        {
          this.props.subTitle ?
            <h3>{ this.props.subTitle }</h3>
          : ''
        }
      </div>
    );
  }
}

module.exports = AppTitle;
