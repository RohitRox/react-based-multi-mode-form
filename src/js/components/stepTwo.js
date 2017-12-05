import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('stepTwoStore')
@observer
export default class StepTwo extends Component {
  setCountry = (e) => {
    this.props.stepTwoStore.setCountry(e.target.value);
  }

  render() {
    return <div>
      <h3>Step Two</h3>
      <p>
        <label>
          Country: <input text='country' onChange={this.setCountry} value={this.props.stepTwoStore.country} />
        </label>
        <br />
        { this.props.stepTwoStore.errors.country && 'Country is required' }
      </p>
    </div>
  }
}
