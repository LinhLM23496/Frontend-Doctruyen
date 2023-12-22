import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { suggestionStorage } from '../mmkv'
import { UseSuggestionType } from './types'
import { suggestionsAPI } from 'api'

const initialState = {
  data: [],
  cached_suggsetions: [],
  isLoading: false,
  error: ''
}

export const useSuggestionStore = create(
  persist<UseSuggestionType>(
    (set, get) => ({
      ...initialState,
      setData(newData) {
        set(() => ({ data: newData, cached_suggsetions: newData }))
      },
      async getData() {
        try {
          set(() => ({ isLoading: true }))

          const books = get().cached_suggsetions

          if (books?.length) return set(() => ({ data: books }))

          const data = await suggestionsAPI.getSuggestions()

          set((state) => ({
            cached_suggsetions: [...state.cached_suggsetions, ...data],
            data: data
          }))
        } catch (error: any) {
          set(() => ({ error: error.message }))
        } finally {
          set(() => ({ isLoading: false }))
        }
      },
      async refetch() {
        try {
          set(() => ({ cached_suggsetions: [] }))
          await get().getData()
        } catch (error: any) {
          set(() => ({ error: error.message }))
        }
      },
      clear() {
        set(() => initialState)
        suggestionStorage.removeItem('suggestionStore')
      }
    }),
    {
      name: 'suggestion-storage',
      storage: createJSONStorage(() => suggestionStorage)
    }
  )
)
