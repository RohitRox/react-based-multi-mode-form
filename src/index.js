import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import SettingComponent from './js/settingsApp';

const WrapApp = () => {
  return <div>
    <h1>The Wrap App</h1>
  </div>
}

const user = {
  first_name: 'Kevin',
  last_name: 'Mc'
}

// Usage
// style props in SettingComponent
// block, wizard or single

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={WrapApp} />
      <SettingComponent style='block' user={user} />
    </div>
  </BrowserRouter>
, document.getElementById('root'));
