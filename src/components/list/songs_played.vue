<template>
  <article class="container py-4" v-if="store.songs_found.length">
    <header>
      <h2 class="text-secondary">
        A list of the songs we found of the label you selected
      </h2>
    </header>
    <p>
      When you have made a request and we found a song by that label. It will
      appear down here.
    </p>
    <section
      class="list-group"
      v-for="(song, key) in store.songs_found_order"
      :key="key"
    >
      <details
        class="list-group-item"
        :data-radio-id="song.radioid"
        :data-radio-name="song.radioname"
      >
        <summary>
          <h3 class="fs-5 text-primary">{{ song.title }}</h3>
          <p class="mb-0">
            <span class="badge bg-dark fw-normal me-2" v-text="song.radioname" />
            <span class="badge bg-dark fw-normal me-2" v-text="song.week" />
            <span class="badge bg-dark fw-normal" v-text="song.starttimeutc" />
          </p>
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
          <li class="list-group-item m-0 p-0">
            <div
              class="btn-group d-flex"
              role="group"
              aria-label="Basic example"
            >
              <a
                type="button"
                class="btn btn-secondary flex-fill"
                :href="getUrl(song)"
                target="noopener noreferrer"
                >SR {{ song.radioname }} that day</a
              >
            </div>
          </li>
        </ul>
      </details>
    </section>
  </article>
</template>

<script setup>
import { useStore } from '../../store'

const store = useStore()

const getUrl = ({ radioid, starttimeutc }) => {
  const date = starttimeutc.split(' ').shift()
  return `https://sverigesradio.se/sida/latlista.aspx?programid=${radioid}&date=${date}`
}
</script>

<style>
::marker {
  content: '';
}
</style>
