<template>
  <div class="mb-4">
    <label class="form-label" for="record-label">Select record label</label>
    <input
      class="form-control"
      :value="record_label"
      :disabled="is_loading"
      @input="({ target }) => setRecord(target)"
      name="record-label"
      id="record-label"
      type="text"
    />
  </div>
</template>

<script setup>
import { useFilters } from '../../store/filters'
import { useStore } from '../../store';

const { record_label, setRecord } = useFilters()
const { is_loading } = useStore()
</script>

<style></style>
