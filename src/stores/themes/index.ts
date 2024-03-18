import { STORAGE_KEY, Storage } from 'stores/storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SizeState, ThemeState } from './types'

export const useRatioStore = create<SizeState>()(
  persist(
    (set) => ({
      ratio: 1,
      setRatio: (number) => set({ ratio: number })
    }),
    {
      name: STORAGE_KEY.RATIO,
      storage: createJSONStorage(() => Storage)
    }
  )
)

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (value) => set({ theme: value }),
      themeSwitch: 'dark',
      setThemeSwitch: (value) => set({ themeSwitch: value })
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => Storage)
    }
  )
)
