<template>
  <article class="container py-4" v-if="songs_found && songs_found.length">
    <header>
      <h2 class="text-secondary">
        A list of the songs we found of the label you selected
      </h2>
    </header>
    <p>
      When you have made a request and we found a song by that label. It will
      appear down here.
    </p>
    <section class="list-group" v-for="(song, key) in songs_found" :key="key">
      <details
        class="list-group-item"
        :data-radio-id="song.radioid"
        :data-radio-name="song.radioname"
      >
        <summary>
          <strong class="text-primary">{{ song.title }}</strong> was played in
          <span class="text-secondary">{{ song.radioname }}</span> on the
          {{ clean_date(song.starttimeutc) }}
        </summary>
        <ul class="list-group mt-3 mb-2">
          <li class="list-group-item" v-if="song.artist">
            Artist: {{ song.artist }}
          </li>
          <li class="list-group-item" v-if="song.albumname">
            Album: {{ song.albumname }}
          </li>
          <li class="list-group-item" v-if="song.composer">
            Composer: {{ song.composer }}
          </li>
          <li class="list-group-item" v-if="song.description">
            Description: {{ song.description }}
          </li>
          <li class="list-group-item" v-if="song.lyricist">
            Lyricist: {{ song.lyricist }}
          </li>
          <li class="list-group-item" v-if="song.recordlabel">
            Recordlabel: {{ song.recordlabel }}
          </li>
        </ul>
      </details>
    </section>
  </article>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '../../store'

export default {
  methods: {
    clean_date(info) {
      const date = new Date(
        Number(info.replace(/\/Date\(/, '').replace(')/', ''))
      )

      const year = date.getFullYear()
      const month =
        date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate()

      return `${year}-${month}-${day}`
    }
  },
  computed: {
    ...mapState(useStore, ['songs_found'])
  }
}
</script>
