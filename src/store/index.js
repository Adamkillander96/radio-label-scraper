import { defineStore } from 'pinia'
import { useFilters } from './filters'

import { channels } from '../shared/data/radio_channel_ids'
import { retrive_all_radio_channels } from '../shared/api/get_radio_channels'

export const useStore = defineStore('store', {
  state: () => ({
    channels,
    songs_found: [],
    weeks_searched: [],
    loading: false,
    message: ''
  }),
  getters: {
    is_loading: (state) => state.loading,
    songs_found_order: (state) => {
      const dates = JSON.parse(JSON.stringify(state.songs_found))
      return dates.sort((a, b) => {
        return new Date(a.starttimeutc) - new Date(b.starttimeutc)
      })
    },
    weeks_searched_order: (state) => {
      const weeks = JSON.parse(JSON.stringify(state.weeks_searched))
      return weeks.sort((a, b) => {
        return new Date(a.dates[0]) - new Date(b.dates[0])
      })
    }
  },
  actions: {
    set_loading(load) {
      this.loading = load
    },
    set_message(message) {
      this.message = message
    },
    async start_scraping() {
      const {
        record_label,
        dates = [],
        week,
        isFutureWeek,
        selectedWeek
      } = useFilters()

      if (this.weeks_searched.find((item) => item.week === week)) {
        this.message = 'Date range already searched.'
        return
      }

      if (isFutureWeek) {
        this.message = `This week is not ready to be fetched.`
        return
      }

      this.message = ''
      this.loading = true

      await retrive_all_radio_channels({ dates })
        .then((songs) => songs.flat(2))
        .then((songs) => this.songs_found.push(...songs))
        .then(() =>
          this.weeks_searched.push({
            week,
            week_number: selectedWeek,
            dates,
            record_label
          })
        )
        .catch((error) => console.log(error))
        .finally(() => {
          this.loading = false
        })
    },
    clear_search({ specific_week = '', all = false }) {
      if (all) {
        this.weeks_searched = []
        this.songs_found = []
        return
      }

      const weeks_not_removed = this.weeks_searched.filter(
        ({ week }) => week !== specific_week
      )
      this.weeks_searched = weeks_not_removed

      const { week } = useFilters()
      const songs_not_removed = this.songs_found.filter(
        (song) => song.week !== week
      )
      this.songs_found = songs_not_removed
    }
  },
  persist: {
    paths: ['songs_found', 'weeks_searched']
  }
})
