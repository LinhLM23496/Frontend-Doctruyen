import { NavigationService, Route } from 'navigation'

export const objectEmpty = (object: any) => {
  if (!object) return true
  if (object && Object.keys(object).length <= 0) return true

  return false
}

export function formatNumber(number: number): string {
  if (number > 1000000000) {
    return (Math.floor(number / 100000000) / 10).toFixed(1) + 'B'
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number > 1000) {
    return (number / 1000).toFixed(1) + 'K'
  } else return number.toString()
}

const routeScreen = (route: string, params: any) => {
  switch (route) {
    case 'page.BookDetail':
      NavigationService.push(Route.BookDetail, params)
      break

    case 'page.ChapterDetail':
      NavigationService.push(Route.Chapter, params)
      break

    case 'page.Profile':
      NavigationService.navigate(Route.Profile, params)
      break

    default:
      NavigationService.navigate(Route.Home)
      break
  }
}

export const parseRoute = (route: string, params: any) => {
  const _params = typeof params === 'string' ? JSON.parse(params) : params

  return routeScreen(route, _params)
}

export const randomItem = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}
