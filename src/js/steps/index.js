import StepOne from '../components/stepOne';
import StepTwo from '../components/stepTwo';

import * as store from '../stores';

const STEPS = {
  1: { path: '/settings/step_one', component: StepOne, title: 'Step One', store: store.stepOne } ,
  2: { path: '/settings/step_two', component: StepTwo, title: 'Step Two', store: store.stepTwo }
};

export default STEPS;
