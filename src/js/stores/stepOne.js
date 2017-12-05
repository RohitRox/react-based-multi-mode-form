import { observable, action } from 'mobx'

class stepOne {
  @observable name = null;
  @observable errors = {
    name: null
  };

  @action setName(name) {
    this.name = name
  }

  @action validate() {
    if (this.name) {
      this.errors.name = false;
    } else {
      this.errors.name = true;
    }
    return !this.errors.name;
  }

  @action submit() {
    console.log('Submitttinggggg step one')
  }
}

export default new stepOne();
