import { RootStackParamList } from './NavigationService'
import Home from 'screens/Home'
import Settings from 'screens/Settings'
import BookDetail from 'screens/BookDetail'
import Splash from 'screens/Splash'
import Chapter from 'screens/Chapter'
import ListBook from 'screens/ListBook'
import Login from 'screens/Login'
import Profile from 'screens/Profile'
import SuggestedBook from 'screens/SuggestedBook'
import SuggestedFunction from 'screens/SuggestedFunction'
import ListNewUpdate from 'screens/ListNewUpdate'

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
  Profile: {
    name: 'Profile',
    component: Profile
  },
  ListBook: {
    name: 'ListBook',
    component: ListBook
  },
  Login: {
    name: 'Login',
    component: Login
  },
  BookDetail: {
    name: 'BookDetail',
    component: BookDetail
  },
  Chapter: {
    name: 'Chapter',
    component: Chapter
  },
  SuggestedBook: {
    name: 'SuggestedBook',
    component: SuggestedBook
  },
  SuggestedFunction: {
    name: 'SuggestedFunction',
    component: SuggestedFunction
  },
  ListNewupdate: {
    name: 'ListNewupdate',
    component: ListNewUpdate
  }
}
export default Route
