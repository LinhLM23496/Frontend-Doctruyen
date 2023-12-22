import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

export const storageBook = new MMKV({ id: 'bookStore' })
export const storageSuggestion = new MMKV({ id: 'suggestionStore' })

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

export const suggestionStorage: StateStorage = {
  setItem(name: string, value: string) {
    return storageSuggestion.set(name, value)
  },
  getItem(name: string) {
    const value = storageSuggestion.getString(name)
    return value ?? null
  },
  removeItem(name) {
    return storageSuggestion.delete(name)
  }
}
