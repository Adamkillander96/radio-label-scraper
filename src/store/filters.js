import { defineStore, acceptHMRUpdate } from 'pinia'
import {
  formatedDate,
  getWeekRange,
  getWeek,
  getDates,
  isFutureWeek,
  getFirstDayOfWeek
} from '../shared/date'

export const useFilters = defineStore('filters', {
  state: () => ({
    date: null,
    week: null,
    record_label: 'Killander Music Records'
  }),
  getters: {
    formatedDate: (state) => state.date && formatedDate(state.date),
    selectedRange: (state) => state.date && getWeekRange(state.date),
    readable_range: (state) =>
      state.date && `${state.dates[0]} to ${state.dates[6]}`,
    selectedWeek: (state) => state.date && getWeek(state.date),
    dates: (state) => state.date && getDates(state.date),
    isFutureWeek: (state) => state.week && isFutureWeek(state.week)
  },
  actions: {
    setDate({ date, week }) {
      const firstDay = getFirstDayOfWeek(date)
      this.date = firstDay
      this.week = week
    },
    setRecord({ value }) {
      this.record_label = value
    }
  },
  persist: true
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFilters, import.meta.hot))
}
