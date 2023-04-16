<template>
  <div class="mb-4">
    <label class="form-label" for="week">Select a week</label>
    <input
      class="form-control"
      :value="week"
      :disabled="is_loading"
      @change="({ target }) => setDate(target)"
      name="week"
      id="week"
      type="week"
    />
  </div>
</template>

<script setup>
import { useFilters } from '../../store/filters'
import { useStore } from '../../store';

const { week, setDate } = useFilters()
const { is_loading } = useStore()
</script>

<style></style>
