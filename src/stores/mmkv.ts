import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

export const storageBook = new MMKV({ id: 'bookStore' })

export const bookStorage: StateStorage = {
  setItem(name: string, value: string) {
    return storageBook.set(name, value)
  },
  getItem(name: string) {
    const value = storageBook.getString(name)
    return value ?? null
  },
  removeItem(name) {
    return storageBook.delete(name)
  }
}
