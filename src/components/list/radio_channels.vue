<template>
  <details v-if="channels && channels.length" class="pb-4">
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
</template>

<script setup>
import { useStore } from '../../store'

const { channels } = useStore()
</script>
