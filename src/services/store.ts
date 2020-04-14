
class Store {
  store: Map<any, any>;

  constructor() {
    this.store = new Map()
  }

  set = (key, value) => {
    const data = {
      value,
      _modified: new Date().toDateString()
    }
    return this.store.set(key, data)
  }

  get = (key, options = { raw: false }) => {
    const data = this.store.get(key)
    if (options.raw === true) {
      return data
    }
    if (data?.value != null) {
      return data.value
    }
    return data
  }
}

export const store = new Store()
