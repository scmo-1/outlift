export function getMonthStart(year: number, month: number): string {
  return new Date(Date.UTC(year, month - 1, 1)).toISOString()
}

export function getNextMonthStart(year: number, month: number): string {
  return new Date(Date.UTC(year, month, 1)).toISOString()
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function formatMonthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat('sv-SE', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, 1))
}
