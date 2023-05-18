import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekOfYear)
dayjs.extend(weekday)

const format = 'YYYY-MM-DD'
const fullFormat = 'YYYY-MM-DD HH:mm:ss'

/* */
export function formatedDate(date) {
  return dayjs(date).format(format)
}

export function fullDate(date) {
  return dayjs(date).format(fullFormat)
}

export function getFirstDayOfWeek(date) {
  const day = dayjs(date).weekday(1)
  return formatedDate(day)
}

/* */
export function getWeekRange(date) {
  const lastDayOfWeek = dayjs(date).add(6, 'day')
  return `${formatedDate(date)}-${formatedDate(lastDayOfWeek)}`
}

/* */
export function getWeek(date = dayjs()) {
  return dayjs(date).week()
}

/* */
export function getDates(date) {
  const dates = []

  for (let i = 0; i < 7; i++) {
    const day = dayjs(date).add(i, 'day')
    dates.push(formatedDate(day))
  }

  return dates
}

/* */
export function isFutureWeek(data) {
  const [year, week] = data.split('-W')

  const selectedYear = Number(year)
  const selectedWeek = Number(week)

  const currentYear = dayjs().year()
  const currentWeek = getWeek()

  if (selectedYear > currentYear) {
    return true
  }

  if (selectedYear < currentYear) {
    return false
  }

  if (selectedYear === currentYear) {
    return selectedWeek > currentWeek
  }
}
