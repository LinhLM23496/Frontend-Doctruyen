export type SizeState = {
  ratio: number
  setRatio: (number: number) => void
}

export type ThemeSwitchType = 'system' | 'light' | 'dark'

export type ThemeType = 'light' | 'dark'

export type ThemeState = {
  theme: ThemeType
  setTheme: (value: ThemeType) => void
  themeSwitch: ThemeSwitchType
  setThemeSwitch: (value: ThemeSwitchType) => void
}
