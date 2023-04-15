import { defineStore } from 'pinia'

import { formatedDate, getWeekRange, getWeek } from '../shared/date'

export const useFilters = defineStore('filters', {
  state: () => ({
    date: null,
    week: null,
    record_label: 'Killander Music Records'
  }),
  getters: {
    formatedDate: (state) => state.date && formatedDate(state.date),
    selectedRange: (state) => state.date && getWeekRange(state.date),
    selectedWeek: (state) => state.date && getWeek(state.date)
  },
  actions: {
    setDate({ valueAsNumber, value }) {
      this.week = value
      this.date = valueAsNumber
    },
    setRecord({ value }) {
      this.record_label = value
    }
  },
  persist: true
})
