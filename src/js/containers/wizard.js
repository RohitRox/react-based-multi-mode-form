import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';

import STEPS from '../steps';

@withRouter
export default class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: null,
      startStep: props.startStep || 1
    };

    if (props.location.pathname) {
      const step = this.findStepByPath(props.location.pathname);
      if(step) {
        this.state.currentStep = parseInt(step.index);
      }
    }
  }

  findStepByPath(path) {
    for (var i in STEPS) {
      if (STEPS[i].path == path) {
          return {index: i, step: STEPS[i]};
      }
    }
  }

  goToStep(stepNum, e) {
    e.preventDefault();
    const step = STEPS[stepNum];
    this.props.history.push(`${step.path}`);
    this.setState({
      currentStep: parseInt(stepNum),
    })
  }

  goAllTheWay() {
    this.props.history.push('/settings');
    this.setState({
      currentStep: null
    });
  }

  goBack = () => {
    if (this.state.currentStep < 2 ) {
      this.goAllTheWay()
    } else {
      const backStep = this.state.currentStep - 1;
      const step = STEPS[backStep];

      this.props.history.push(`${step.path}`);
      this.setState({
        currentStep: backStep
      });
    }
  }

  saveAndNext = () => {
    const step = STEPS[this.state.currentStep];
    if (step.store.validate()) {
      step.store.submit();
      this.state.currentStep == Object.keys(STEPS).length ? this.goAllTheWay() : this.goNext();
    }
  }

  goNext = () => {
    const nextStep = this.state.currentStep + 1;
    this.setState({
      currentStep: nextStep
    });
    const step = STEPS[nextStep];
    this.props.history.push(`${step.path}`);
  }

  getButtons() {
    const nextText = this.state.currentStep >= Object.keys(STEPS).length ? 'Save' : 'Next';

    return <div>
      { <button onClick={this.goBack}>Back</button>}
      <button onClick={this.saveAndNext}>{nextText}</button>
    </div>
  }

  getStepsList() {
    let stepsIndex = [];
    Object.keys(STEPS).forEach((stepNum) => {
      stepsIndex.push(
        <li>
          { STEPS[stepNum].title }
          <br />
          { this.state.startStep == stepNum && <a key={STEPS[stepNum].path} href={STEPS[stepNum].path} onClick={this.goToStep.bind(this, stepNum)} >
            Start
          </a> }
        </li>
      )
    });
    return <ol>
      { stepsIndex }
    </ol>
  }

  getSteps() {
    let steps = [];
    Object.keys(STEPS).forEach((stepNum) => {
      const StepComponent = STEPS[stepNum].component;
      steps.push(
        <div>
          <Route path={STEPS[stepNum].path} key={STEPS[stepNum].path} component={StepComponent} />
        </div>
      )
   });
   return steps;
  }

  render() {
    return <div>
      { !this.state.currentStep && this.getStepsList() }
      { this.getSteps() }
      { this.state.currentStep && this.getButtons() }
    </div>
  }
}
