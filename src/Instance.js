class Instance {
  _setInstanceFn = () => ({});

  constructor() {
    this.id = Math.random();
  }

  getInstance() {
    return this._setInstanceFn();
  }

  setInstance(fn) {
    this._setInstanceFn = fn;
  }
}


export default Instance;
