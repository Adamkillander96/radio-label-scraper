<template>
  <main>
    <div class="container">
      <h1>Radio Label Scraper</h1>
      <p>
        With this tool, you can select a date range and a record label name to
        find out if that label played any songs on the swedish radio channel P4.
        We search all of the channels regions so you don't have to manually
        search every dang page.
      </p>
      <details v-if="channels && channels.length">
        <summary>The list of all the channels we scrape</summary>
        <ul>
          <li v-for="({ name, id }, key) in channels" :key="key">
            <a
              :href="`https://sverigesradio.se/sida/latlista.aspx?programid=${id}`"
              target="noopener noreferrer"
              v-text="name"
            />
          </li>
        </ul>
      </details>
      <search />
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStore } from '../store'

import search from './search.vue'

export default {
  components: {
    search
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

<style>
.container {
  max-width: 25em;
  margin: 0 auto;
  padding: 0 2.5rem 2.5rem;
}

.form .field {
	padding: 1rem 0
}

.input {
	display: block;
	width: 100%;
	padding: .5rem
}
</style>
