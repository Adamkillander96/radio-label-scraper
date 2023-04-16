<template>
  <article class="container py-4" v-if="weeks_searched.length">
    <header>
      <h3 class="text-secondary">Previously searched date ranges</h3>
    </header>
    <section v-for="(item, key) in weeks_searched" :key="key">
      <p>{{ item }}</p>
    </section>
  </article>
</template>

<script setup>
import { useStore } from '../../store'

const { weeks_searched } = useStore()
</script>
