<template>
  <article class="container py-4" v-if="store.weeks_searched.length">
    <header>
      <h3 class="text-secondary">Previously searched date ranges</h3>
    </header>
    <ul class="list-group">
      <li
        v-for="({ dates, week }, key) in store.weeks_searched_order"
        :key="key"
        class="list-group-item m-0 p-0 d-flex"
      >
        <p class="d-flex align-items-center flex-fill mb-0 p-2">
          {{ week }}
          <span class="badge bg-primary fw-normal ms-2">
            {{ songs_found_this_week(week) }}
          </span>
        </p>
        <button
          class="btn btn-primary btn-sm"
          @click="update(week, dates)"
          :disabled="store.loading"
        >
          Update
        </button>
        <button
          class="btn btn-danger btn-sm"
          @click="are_you_sure(week, record_label)"
          :disabled="store.loading"
        >
          Remove
        </button>
      </li>
    </ul>
  </article>
</template>

<script setup>
import { useStore } from '../../store'
import { useFilters } from '../../store/filters'

const store = useStore()
const filters = useFilters()

const songs_found_this_week = (item) => {
  return store.songs_found?.filter(({ week }) => week === item)?.length
}

const update = (week, dates) => {
  store.clear_search({ specific_week: week })
  filters.setDate({
    week,
    date: dates[0]
  })
  store.start_scraping()
}

const are_you_sure = (item) => {
  if (confirm('You sure you wanna delete that?')) {
    store.clear_search({ specific_week: item })
  }
}
</script>
