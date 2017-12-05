import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('stepOneStore')
@observer
export default class StepOne extends Component {
  setName = (e) => {
    this.props.stepOneStore.setName(e.target.value);
  }

  render() {
    return <div>
      <h3>Step One</h3>
      <p>
        <label>
          Name: <input text='text' onChange={this.setName} value={this.props.stepOneStore.name} />
        </label>
        <br />
        { this.props.stepOneStore.errors.name && 'Name is required' }
      </p>
    </div>
  }
}
