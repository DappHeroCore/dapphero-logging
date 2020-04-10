
class Store {
  store: Map<any, any>;

  constructor() {
    this.store = new Map()
  }

  set = (key, value) => this.store.set(key, value)

  get = (key) => this.store.get(key)
}

export const store = new Store()
