export type ResponseDefaultType = {
  msg: string
}

export type PagingType = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ResponsePagingType = {
  msg: string
  data: any[]
  paging: PagingType
}

export type Error = {
  message: string
}
