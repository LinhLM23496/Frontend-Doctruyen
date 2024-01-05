import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

export const storageSize = new MMKV({ id: 'sizeStore' })

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

export const storageTheme = new MMKV({ id: 'themeStore' })

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
