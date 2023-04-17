import dayjs from 'dayjs' // ES 2015
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

const format = 'YYYY-MM-DD'

/* */
export function formatedDate(date) {
  return dayjs(date).format(format)
}

/* */
export function getWeekRange(date) {
  const lastDayOfWeek = dayjs(date).add(6, 'day')
  return `${formatedDate(date)}-${formatedDate(lastDayOfWeek)}`
}

/* */
export function getWeek(date) {
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
