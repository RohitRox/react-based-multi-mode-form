import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Provider } from 'mobx-react';


import Wizard from './containers/wizard';
import Block from './containers/block';
import Single from './containers/single';

import * as stores from './stores';

const combinedStores = {
  stepOneStore: stores.stepOne,
  stepTwoStore: stores.stepTwo
}

export default class SettingRoot extends Component {
  isWizard() {
    return this.props.style == 'wizard';
  }

  isBlock() {
    return this.props.style == 'block';
  }

  isSingle() {
    return this.props.style == 'single';
  }

  goToMain = () => {
    this.props.history.push('/settings');
  }

  render() {
    return <Provider {...combinedStores}>
        <div className='container'>
        <h1>Settings</h1>
        <hr />
        { this.isWizard() && <Wizard goToMain={this.goToMain} history={this.props.history} /> }
        { this.isSingle() && <Single /> }
        { this.isBlock() && <Block goToMain={this.goToMain} history={this.props.history} /> }
      </div>
    </Provider>
  }
}
