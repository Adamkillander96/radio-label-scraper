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
    searched: (state) => {
      const songs = state.weeks_searched
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

      const { dates = [], record_label, week } = useFilters()

      if (this.weeks_searched.includes(week)) {
        this.message = 'Date range already searched.'
        return
      }

      this.message = ''
      this.loading = true

      await retrive_all_radio_channels({ dates, record_label })
        .then((songs) => songs.flat(2))
        .then((songs) => this.songs_found.push(...songs))
        .then(() => this.weeks_searched.push(week))
        .finally(() => {
          this.loading = false
        })
    }
  },
  persist: {
    paths: ['songs_found', 'weeks_searched']
  }
})
