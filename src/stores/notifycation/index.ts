import { create } from 'zustand'
import { NotiState, NotifycationType } from './types'

const initialStateNoti: NotifycationType = {
  display: false,
  type: 'info',
  autoClose: false
}

export const useNotifycation = create<NotiState>((set) => ({
  notifycation: initialStateNoti,
  setNotifycation: (data) => {
    set((state) => ({
      notifycation: { ...state.notifycation, ...data }
    }))
  },
  closeNotifycation: () =>
    set((state) => ({
      notifycation: {
        ...initialStateNoti,
        position: state.notifycation?.position
      }
    }))
}))
