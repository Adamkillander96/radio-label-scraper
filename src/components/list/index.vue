<template>
	<section class="container" v-if="songs && songs.length">
		<h2>A list of the songs we found of the label you selected</h2>
		<p>
			When you have made a request and we found a song by that label. It will
			appear down here.
		</p>
		<article>
			<header>
				<h3>List</h3>
			</header>
			<section
				v-for="(
					{
						albumname,
						artist,
						composer,
						description,
						lyricist,
						radioid,
						radioname,
						recordlabel,
						starttimeutc,
						stoptimeutc,
						title
					},
					key
				) in songs"
				:key="key"
			>
				<details :data-radio-id="radioid" :data-radio-name="radioname">
					<summary>
						{{ radioname }} ({{ clean_date(starttimeutc) }} -
						{{ clean_date(stoptimeutc) }})
					</summary>
					<p>Artist: {{ artist }}</p>
					<p>Albumname: {{ albumname }}</p>
					<p>Composer: {{ composer }}</p>
					<p>Description: {{ description }}</p>
					<p>Lyricist: {{ lyricist }}</p>
					<p>Recordlabel: {{ recordlabel }}</p>
					<p>Title: {{ title }}</p>
				</details>
			</section>
		</article>
	</section>
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

			const hour = date.getHours()
			const minute = date.getMinutes()

			return `${year}-${month}-${day} ${hour}:${minute}`
		}
	},
	computed: {
		...mapState(useStore, ['songs'])
	}
}
</script>
