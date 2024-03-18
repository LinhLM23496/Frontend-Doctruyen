import { create } from 'zustand'
import { ModalState, ModalType } from './types'

const initialModal: ModalType = {
  display: false,
  type: 'info',
  autoClose: false
}

export const useModal = create<ModalState>((set) => ({
  modal: initialModal,
  setModal: (data) => {
    set((state) => ({
      modal: { ...state.modal, ...data }
    }))
  },
  closeModal: () =>
    set((state) => ({
      modal: {
        ...initialModal,
        position: state.modal?.position
      }
    }))
}))
