<template>
  <div class="record">
    <label class="label" for="record-label">Select record label</label>
    <input
      class="input"
      :value="record_label"
      @input="({ target }) => setRecord(target)"
      name="record-label"
      id="record-label"
      type="text"
    />
  </div>
</template>

<script setup>
import { useFilters } from '../../store/filters'

const { record_label, setRecord } = useFilters()
</script>

<style></style>
