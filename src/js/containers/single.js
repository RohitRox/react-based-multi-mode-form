import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

import STEPS from '../steps';

export default class Single extends Component {
  getSteps() {
    let steps = [];
    Object.keys(STEPS).forEach(function(stepNum) {
      const StepComponent = STEPS[stepNum].component;
      steps.push(
        <StepComponent store={STEPS[stepNum].store} />
      )
   });
   return steps;
  }

  validateAll = () => {
    let bool = false;
    Object.keys(STEPS).forEach(function(stepNum) {
      if (STEPS[stepNum].store.validate()) {
        bool = true;
      } else {
        bool = false;
      }
    });
    return bool;
  }

  submitAll = () => {
    Object.keys(STEPS).forEach(function(stepNum) {
      STEPS[stepNum].store.submit()
    });
  }

  submit = () => {
   if ( this.validateAll() ) {
    this.submitAll()
   }
  }

  render() {
    return <div>
      { this.getSteps() }
      <button onClick={this.submit}>Save</button>
    </div>
  }
}
