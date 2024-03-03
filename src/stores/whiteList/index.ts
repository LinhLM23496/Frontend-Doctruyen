import { create } from 'zustand'
import { WhiteListState, WhiteListType } from './types'

const initialStateWhiteList: WhiteListType = {
  categories: []
}

export const useWhiteList = create<WhiteListState>((set) => ({
  whiteList: initialStateWhiteList,
  setWhiteList: (data) => {
    set((state) => ({
      whiteList: { ...state.whiteList, ...data }
    }))
  }
}))
