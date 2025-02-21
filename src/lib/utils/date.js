export function prettyDate(rawDate) {
  const date = new Date(rawDate)
  
  let day = date.getDate()
  // get Dutch month name
  let month = date.toLocaleString('default', { month: 'long' })
  let year = date.getFullYear()
  if (day.toString().length < 2) day = `0${day}`
  if (month.toString().length < 2) month = `0${month}`

  return `${day} ${month} ${year}`
}

export function longDate(rawDate) {
  const date = new Date(rawDate)
  let year = date.getFullYear()
  return `${prettyDate(rawDate)}/${year}`
}

export function getDateTimeString(rawDate) {
  const date = new Date(rawDate)
  return date
}