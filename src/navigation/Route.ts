import { RootStackParamList } from './NavigationService'
import Home from 'screens/Home'
import Settings from 'screens/Settings'
import BookDetail from 'screens/BookDetail'
import Splash from 'screens/Splash'
import Chapter from 'screens/Chapter'
import ListBook from 'screens/ListBook'

type RouteConfig = {
  [key in keyof RootStackParamList]: {
    name: key
    component: React.ComponentType<any>
  }
}

const Route: RouteConfig = {
  Splash: {
    name: 'Splash',
    component: Splash
  },
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
  ListBook: {
    name: 'ListBook',
    component: ListBook
  },
  BookDetail: {
    name: 'BookDetail',
    component: BookDetail
  },
  Chapter: {
    name: 'Chapter',
    component: Chapter
  }
}
export default Route
