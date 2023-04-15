import { defineStore } from 'pinia'
import { useFilters } from './filters'

import { channels } from '../assets/radio_channel_ids'

export const useStore = defineStore('store', {
  state: () => ({
    channels,
    songs_found: [],
    loading: false,
    message: {}
  }),
  getters: {
    is_loading: (state) => state.loading
  },
  actions: {
    set_songs_found(songs) {
      this.songs_found.push(songs)
    },
    set_loading(load) {
      this.loading = load
    },
    set_message(message) {
      this.message = message
    },
    async start_scraping(data) {
      this.loading = true

      await this.retrive_radio_channels()

			this.loading = false
    },
    async retrive_radio_channels() {
      const list = channels.map(
        ({ id, name }) =>
          new Promise(
            async (resolve, reject) =>
              await this.get_radio_channel({ id, name })
                .then((songs = []) => {
                  if (songs.length === 0) return resolve()

                  return resolve(songs)
                })
                .catch((error) => reject(error))
          )
      )
      return await Promise.all(list)
    },
    /**
     * @description Get one specific radio channels music list
     * @param {Object} data
     * @param {Number} data.id A numeric value representing the radio channel.
     * @param {String} data.name A string value representing the radio channel.
     * @returns An array of objects containing the songs played on that channel that day.
     */
    async get_radio_channel(data = {}) {
      const { id, name } = data

      const { selectedRange } = useFilters()
			const { from, to } = selectedRange

			console.time(name)

      return await fetch(
        `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id}&startDateTime=${from}&endDateTime=${to}&size=10000&format=json`,
        {
          method: 'GET'
        }
      )
        .then((response) => response.json())
        .then(({ song = [] }) =>
          song.filter(({ recordlabel = '' }) => recordlabel.match(record_label))
        )
        .then((filtered_songs) => {
          return filtered_songs.map((song) => {
            song.radioid = id
            song.radioname = name
            this.songs_found.push(song)
          })
        })
        .catch((err) => err)
        .finally(() => console.timeEnd(name))
    }
  },
  persist: true
})
