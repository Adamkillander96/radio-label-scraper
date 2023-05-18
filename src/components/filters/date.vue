<template>
  <div class="mb-4">
    <label class="form-label" for="week">Select a week</label>
    <input
      class="form-control"
      :value="filters.date"
      :disabled="is_loading"
      @change="({ target }) => formatInput(target)"
      name="week"
      id="week"
      type="date"
    />
    <output class="d-block mt-3 py-2 px-3" name="selected_week" for="week">
      W{{ filters.selectedWeek }},
      {{ filters.readable_range }}
    </output>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

import { useFilters } from '../../store/filters'
import { useStore } from '../../store'

const filters = useFilters()
const { is_loading } = useStore()

function formatInput({ value }) {
  const date = dayjs(value)
  filters.setDate({
    date: date.format('YYYY-MM-DD'),
    week: `${date.year()}-W${date.week()}`
  })
}
</script>
