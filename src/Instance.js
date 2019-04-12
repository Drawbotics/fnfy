class Instance {
  _setInstanceFn = () => ({});

  getInstance() {
    return this._setInstanceFn();
  }

  setInstance(fn) {
    this._setInstanceFn = fn;
  }
}


export default Instance;
