<template>
  <form class="form" @submit.prevent>
    <date class="field" />
    <record-label class="field" />
    <button
      class="btn btn-primary me-2"
      @click="start_scraping"
      :disabled="is_loading"
    >
      Search
      <span
        v-if="is_loading"
        class="spinner-border spinner-border-sm"
        role="status"
      >
        <span class="visually-hidden">Searching...</span>
      </span>
    </button>
    <button class="btn btn-outline-danger" @click="reset_all">Reset</button>

    <div
      class="alert alert-danger my-4 alert-dismissible"
      role="alert"
      v-if="message"
    >
      {{ message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="set_message('')"
      ></button>
    </div>
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
    ...mapActions(useStore, ['set_message', 'start_scraping', 'clear_search']),
    reset_all() {
      if (
        confirm('This removes everything. You sure you wanna do that big guy?')
      ) {
        this.clear_search({ all: true })
      }
    }
  },
  components: {
    date,
    recordLabel
  }
}
</script>
