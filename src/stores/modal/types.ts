import { ButtonProps, TypeButtonType } from 'components/Button/types'
import { PositionModal } from 'components/Modal/types'

export type ModalType = {
  display: boolean
  position?: PositionModal
  type?: TypeButtonType
  title?: string
  subTitle?: string
  content?: string
  button?: ButtonType[]
  autoClose?: boolean
}

type ButtonType = ButtonProps & {
  content: string
}

export type ModalState = {
  modal: ModalType
  setModal: (data: ModalType) => void
  closeModal: () => void
}
