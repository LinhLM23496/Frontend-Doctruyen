import { RootStackParamList } from './NavigationService'
import Home from 'screens/Home'
import Settings from 'screens/Settings'
import BookDetail from 'screens/BookDetail'

type RouteConfig = {
  [key in keyof RootStackParamList]: {
    name: key
    component: React.ComponentType<any>
  }
}

const Route: RouteConfig = {
  Main: {
    name: 'Main',
    //@ts-ignore
    component: undefined
  },
  Home: {
    name: 'Home',
    component: Home
  },
  Settings: {
    name: 'Settings',
    component: Settings
  },
  BookDetail: {
    name: 'BookDetail',
    component: BookDetail
  }
}
export default Route
