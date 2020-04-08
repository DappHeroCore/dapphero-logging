

class Store {
  store: Map<any,any>;

  constructor(){
    this.store = new Map()
  }

  set = (key, value) => {
    return this.store.set(key, value)
  }

  get = (key) => {
    return this.store.get(key)
  }
}

export const store = new Store()