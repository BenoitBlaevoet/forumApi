function difference (date) {
  const now = new Date().getTime()
  const from = new Date(date).getTime()

  return now - from
}

const diviser = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
  week: 604800000,
  month: 2592000000,
  year: 31536000000
}

function formatDifference (difference, format, dateCompare) {
  const diff = Math.round(difference / diviser[format])
  let message = diff.toString() + ' '
  message += diff < 2 ? format : format + 's'
  message += ' ago'
  const dateFormat = new Date(dateCompare)
  const date = dateFormat.getDate() +
  '/' + (dateFormat.getMonth() + 1) +
  '/' + dateFormat.getFullYear() +
  ' ' + dateFormat.getHours() +
  ':' + dateFormat.getMinutes() +
  ':' + dateFormat.getSeconds()
  const timestamp = dateFormat.getTime()
  return Object.assign({ message }, { difference }, { date }, { timestamp })
}

module.exports = function diffForHumans (date) {
  const diff = difference(date)
  // Check the difference and format the difference with the best option
  if (diff < diviser.minute) return formatDifference(diff, 'second', date)
  if (diff < diviser.hour) return formatDifference(diff, 'minute', date)
  if (diff < diviser.day) return formatDifference(diff, 'hour', date)
  if (diff < diviser.week) return formatDifference(diff, 'day', date)
  if (diff < diviser.month) return formatDifference(diff, 'week', date)
  if (diff < diviser.year) return formatDifference(diff, 'month', date)
  if (diff >= diviser.year) return formatDifference(diff, 'year', date)
}
