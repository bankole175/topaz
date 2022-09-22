export function getFile(file: string) {
  return `${import.meta.env.VITE_APP_FILE_URL}/${file}`
}

export function formattedDate(date: string) {
  return new Date(date).toDateString()
}
