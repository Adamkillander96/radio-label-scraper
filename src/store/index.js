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
    is_loading: (state) => state.loading
  },
  actions: {
    set_loading(load) {
      this.loading = load
    },
    set_message(message) {
      this.message = message
    },
    async start_scraping() {
      const { dates = [], week, isFutureWeek } = useFilters()

      if (this.weeks_searched.includes(week)) {
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
        .then(() => this.weeks_searched.push(week))
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
        (item) => item !== specific_week
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
