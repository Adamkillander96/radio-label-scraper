<template>
  <main>
    <article class="container">
      <header>
        <h1>Radio Label Scraper</h1>
      </header>
      <p>
        With this tool, you can select a week and enter a record label name to
        find out if that label played any songs on the swedish radio channel P4.
        We search all of the channels regions so you don't have to manually
        search every dang page.
      </p>
      <radioChannels />
      <search />
    </article>
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
  computed: {
    ...mapState(useStore, ['channels', 'is_loading', 'message'])
  },
  methods: {
    ...mapActions(useStore, ['start_scraping']),
    get_radio_songs() {
      return this.start_scraping()
    }
  }
}
</script>
