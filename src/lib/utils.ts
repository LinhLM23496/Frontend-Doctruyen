export const objectEmpty = (object: any) => {
  if (!object) return false
  if (object && Object.keys(object).length <= 0) return false

  return true
}

export function formatNumber(number: number): string {
  if (number > 1000000000) {
    return (Math.floor(number / 100000000) / 10).toFixed(1) + 'B'
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number > 1000) {
    return (number / 1000).toFixed(1) + 'K'
  } else return number.toString()
}
