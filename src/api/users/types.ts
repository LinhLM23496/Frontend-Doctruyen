export type UserInfoType = {
  _id: string
  displayName: string
  email: string
  role: string[]
}

export type CreateSuggestedType = {
  type: 'book' | 'function'
  name: string
  description?: string
  author?: string
  url?: string
}
