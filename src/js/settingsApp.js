import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import SettingRoot from './settingRoot';

import './styles.scss';

class SettingApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Route path='/settings' render={ (props) => <SettingRoot style={this.props.style} user={this.props.user} {...props} />} />
    );
  }
}

export default SettingApp;
