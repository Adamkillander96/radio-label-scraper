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
  return {
    from: formatedDate(date),
    to: dayjs(date).add(6, 'day').format(format)
  }
}

/* */
export function getWeek(date) {
  return dayjs(date).week()
}