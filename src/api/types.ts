export type ResponseDefaultType = {
  message: string
}

export type PagingType = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ResponsePagingType = {
  message: string
  data: any[]
  paging: PagingType
}

export type Error = {
  message: string
}
