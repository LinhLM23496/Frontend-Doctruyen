export type WhiteListType = {
  categories?: string[]
  [key: string]: any
}

export type WhiteListState = {
  whiteList: WhiteListType
  setWhiteList: (data: WhiteListType) => void
}
