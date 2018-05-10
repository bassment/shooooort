import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Layout } from './ui/layout/layout';
import { Routes } from './routes/routes';

import { sprite } from '../utils/svgSprite';

import '../styles/reset.scss';
import '../styles/base.scss';

export class App extends Component {
  async componentWillMount() {
    sprite.elem = sprite.render(document.body);
  }

  componentWillUnmount() {
    sprite.elem.parentNode.removeChild(sprite.elem);
  }

  render() {
    const { siteLoading, currentLocation } = this.props;

    return (
      <Route render={props => (
        <Layout
          {...props}
          siteLoading={siteLoading}
          location={currentLocation}
        >
          <Routes {...props} />
        </Layout>
      )}
      />
    );
  }
}
App.defaultProps = {
  siteLoading: 0,
};
App.propTypes = {
  siteLoading: PropTypes.number,
  currentLocation: PropTypes.string.isRequired,
};
