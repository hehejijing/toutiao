// 封装本地存储
// 用calss类 特性 ：封装 继承 多态

class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    try {
      // 如果是JSON格式 就parse
      return JSON.parse(value)
    } catch {
      // 如果不是JSON就直接return
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value != null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
