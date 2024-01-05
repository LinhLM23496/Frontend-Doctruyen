import { sizeStorage, themeStorage } from 'stores/mmkv'
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
      name: 'size-storage',
      storage: createJSONStorage(() => sizeStorage)
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
      name: 'theme-storage',
      storage: createJSONStorage(() => themeStorage)
    }
  )
)
