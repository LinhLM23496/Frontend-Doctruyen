import { ButtonProps, TypeButtonType } from 'components/Button/types'
import { PositionModal } from 'components/Modal/types'

export type NotifycationType = {
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

export type NotiState = {
  notifycation: NotifycationType
  setNotifycation: (data: NotifycationType) => void
  closeNotifycation: () => void
}
