<template>
  <details v-if="channels && channels.length" class="pb-4">
    <summary class="btn btn-outline-primary w-100">
      The list of all the channels we scrape
    </summary>
    <div class="list-group">
      <a
        v-for="({ name, id }, key) in channels"
        :key="key"
        :href="`https://sverigesradio.se/sida/latlista.aspx?programid=${id}`"
        target="noopener noreferrer"
        class="list-group-item list-group-item-action"
        v-text="`P4 ${name}`"
      />
    </div>
  </details>
</template>

<script setup>
import { useStore } from '../../store'

const { channels } = useStore()
</script>
