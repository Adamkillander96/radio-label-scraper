<template>
  <form class="form" @submit.prevent>
    <date class="field" />
    <record-label class="field" />
    <button @click="search" :disabled="is_loading">
      {{ text }}
    </button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStore } from '../store'
import { useFilters } from '../store/filters'

import date from './filters/date.vue'
import recordLabel from './filters/record_label.vue'

export default {
  computed: {
    ...mapState(useStore, ['is_loading']),
    ...mapState(useFilters, ['filter']),
    text() {
      return this.is_loading ? 'Söker' : 'Sök'
    }
  },
  methods: {
    ...mapActions(useStore, ['start_scraping']),
    search() {
      return this.start_scraping()
    }
  },
  components: {
    date,
    recordLabel
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
  padding: 1rem 0;
}

.input {
  display: block;
  width: 100%;
  padding: 0.5rem;
}
</style>
