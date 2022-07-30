import storage from './storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'

export const getToken = () => {
  storage.get(TOKEN)
}

export const setToken = (value) => {
  storage.set(TOKEN, value)
}

export const removeToken = () => {
  storage.remove(TOKEN)
}
