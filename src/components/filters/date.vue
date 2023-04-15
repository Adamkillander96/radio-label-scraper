<template>
  <div class="date">
    <label class="label" for="week">Select a week</label>
    <input
      class="input"
      :value="week"
      @change="({ target }) => setDate(target)"
      name="week"
      id="week"
      type="week"
    />
  </div>
</template>

<script setup>
import { useFilters } from '../../store/filters'

const { week, setDate } = useFilters()
</script>

<style></style>
