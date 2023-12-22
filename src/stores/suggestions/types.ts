export type UseSuggestionType = {
  data: any[]
  setData: (newData: any[]) => void
  cached_suggsetions: any[]
  isLoading: boolean
  getData: () => Promise<void>
  refetch: () => Promise<void>
  clear: () => void
  error: string
}
