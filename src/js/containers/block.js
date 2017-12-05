import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';

import STEPS from '../steps';

@withRouter
export default class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: null
    };

    if (props.location.pathname) {
      const step = this.findStepByPath(props.location.pathname);
      if(step) {
        this.state.currentStep = step.index;
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

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED", this.props);
  }


  goToStep(stepNum, e) {
    e.preventDefault();
    const step = STEPS[stepNum];
    this.props.history.push(`${step.path}`);
    this.setState({
      currentStep: stepNum
    })
  }

  getStepsList() {
    let stepsIndex = [];
    Object.keys(STEPS).forEach((stepNum) => {
      stepsIndex.push(<li><a key={STEPS[stepNum].path} href={STEPS[stepNum].path} onClick={this.goToStep.bind(this, stepNum)} >{ STEPS[stepNum].title }</a></li>)
    });
    return <ul>
      { stepsIndex }
    </ul>
  }
  goBack  = () => {
    this.props.history.push('/settings');
    this.setState({
      currentStep: null
    })
  }

  save = () => {
    const step = STEPS[this.state.currentStep];
    if (step.store.validate()) {
      step.store.submit();
      this.goBack();
    }
  }

  getButtons() {
    return <div>
      <button onClick={this.goBack}>Back</button>
      <button onClick={this.save}>Save</button>
    </div>
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
