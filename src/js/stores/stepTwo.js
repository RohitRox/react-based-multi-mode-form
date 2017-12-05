import { observable, action } from 'mobx'

class stepTwo {
  @observable country = null;
  @observable errors = {
    country: null
  };

  @action setCountry(country) {
    this.country = country
  }

  @action validate() {
    if (this.country) {
      this.errors.country = false;
    } else {
      this.errors.country = true;
    }
    return !this.errors.country;
  }

  @action submit() {
    console.log('Submitttinggggg step two')
  }
}

export default new stepTwo();
