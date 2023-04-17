<template>
  <main>
    <div class="container">
      <h1>Radio Label Scraper</h1>
      <p>
        With this tool, you can select a week and enter a record label name to
        find out if that label played any songs on the swedish radio channel P4.
        We search all of the channels regions so you don't have to manually
        search every dang page.
      </p>
      <radioChannels />
      <search />
    </div>
    <songs />
    <searched />
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStore } from '../store'

import radioChannels from './list/radio_channels.vue'
import search from './search.vue'
import songs from './list/songs_played.vue'
import searched from './list/ranges_searched.vue'

export default {
  components: {
    radioChannels,
    search,
    songs,
    searched
  },
  data: () => ({
    radio_date_start: '',
    radio_date_end: '',
    record_label: 'Killander Music Records'
  }),
  computed: {
    ...mapState(useStore, [
      'channels',
      'filter',
      'songs',
      'is_loading',
      'message'
    ])
  },
  methods: {
    ...mapActions(useStore, ['start_scraping']),
    get_radio_songs() {
      return this.start_scraping()
    }
  }
}
</script>