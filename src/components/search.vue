<template>
  <form class="form" @submit.prevent>
    <date class="field" />
    <record-label class="field" />
    <button class="btn btn-primary" @click="start_scraping" :disabled="is_loading">
      Search
      <span v-if="is_loading" class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Searching...</span>
      </span>
    </button>
    <div class="alert alert-warning my-4" role="alert" v-if="message" v-text="message" />
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
    ...mapState(useStore, ['is_loading', 'message']),
    ...mapState(useFilters, ['filter'])
  },
  methods: {
    ...mapActions(useStore, ['start_scraping'])
  },
  components: {
    date,
    recordLabel
  }
}
</script>