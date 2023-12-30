export const objectEmpty = (object: any) => {
  if (!object) return false
  if (object && Object.keys(object).length <= 0) return false

  return true
}
