<template>
  <article class="container py-4" v-if="store.weeks_searched.length">
    <header>
      <h3 class="text-secondary">Previously searched date ranges</h3>
    </header>
    <ul class="list-group">
      <li
        v-for="(item, key) in store.weeks_searched"
        :key="key"
        class="list-group-item m-0 p-0 d-flex"
      >
        <p class="d-flex align-items-center flex-fill mb-0 p-2">
          {{ item }}
          <span class="badge bg-primary fw-normal ms-2">
            {{ songs_found_this_week(item) }}
          </span>
        </p>
        <button class="btn btn-danger btn-sm" @click="are_you_sure(item)">
          Remove
        </button>
      </li>
    </ul>
  </article>
</template>

<script setup>
import { useStore } from '../../store'

const store = useStore()

const songs_found_this_week = (item) => {
  return store.songs_found?.filter(({ week }) => week === item)?.length
}

const are_you_sure = (item) => {
  if (confirm('You sure you wanna delete that?')) {
    store.clear_search({ specific_week: item })
  }
}
</script>
