import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

const storageSize = new MMKV({ id: 'sizeStore' })
export const sizeStorage: StateStorage = {
  setItem(name: string, value: string) {
    return storageSize.set(name, value)
  },
  getItem(name: string) {
    const value = storageSize.getString(name)
    return value ?? '1'
  },
  removeItem(name) {
    return storageSize.delete(name)
  }
}

const storageTheme = new MMKV({ id: 'themeStore' })
export const themeStorage: StateStorage = {
  setItem(name: string, value: string) {
    return storageTheme.set(name, value)
  },
  getItem(name: string) {
    const value = storageTheme.getString(name)
    return value ?? 'system'
  },
  removeItem(name) {
    return storageTheme.delete(name)
  }
}

const storageToken = new MMKV({ id: 'tokenStore' })
export const tokenStorage: StateStorage = {
  setItem(name: string, value: string) {
    return storageToken.set(name, value)
  },
  getItem(name: string) {
    const value = storageToken.getString(name)
    return value ?? null
  },
  removeItem(name) {
    return storageToken.delete(name)
  }
}

const storageUser = new MMKV({ id: 'userStore' })
export const userStorage: StateStorage = {
  setItem(name: string, value: string) {
    return storageUser.set(name, value)
  },
  getItem(name: string) {
    const value = storageUser.getString(name)
    return value ?? null
  },
  removeItem(name) {
    return storageUser.delete(name)
  }
}

const storageHistory = new MMKV({ id: 'historyStore' })
export const historyStorage: StateStorage = {
  setItem(name: string, value: string) {
    return storageHistory.set(name, value)
  },
  getItem(name: string) {
    const value = storageHistory.getString(name)
    return value ?? null
  },
  removeItem(name) {
    return storageHistory.delete(name)
  }
}
