<template>
	<main>
		<div class="container">
			<h1>Radio Label Scraper</h1>
			<p>
				With this tool, you can select a date range and a record label name to
				find out if that label played any songs on the swedish radio channel P4.
				We search all of the channels regions so you don't have to manually
				search every dang page.
			</p>
			<details v-if="get_channels">
				<summary>The list of all the channels we scrape</summary>
				<ul>
					<li v-for="({ name, id }, key) in get_channels" :key="key">
						<a
							:href="`https://sverigesradio.se/sida/latlista.aspx?programid=${id}`"
							target="noopener noreferrer"
							>{{ name }}</a
						>
					</li>
				</ul>
			</details>
			<form class="form">
				<div>
					<h2>Get radio songs from this record label and date</h2>
					<p>First box is the start range.</p>
					<p>
						The end date box <strong>has</strong> to be after the start date.
						Otherwise this will result in errors dawg
					</p>
					<p>
						In the third field you need to type in the name of a record label.
					</p>
					<p>
						This tool is thrown together, so we have not balanced the requests.
						So please keep the date ranges to max 2 weeks.
					</p>
					<div class="group">
						<div class="item">
							<label class="title" for="radio_date_start"
								>Select start date</label
							>
							<input
								class="input-control"
								v-model="radio_date_start"
								name="radio_date_start"
								id="radio_date_start"
								type="date"
							/>
						</div>
						<div class="item">
							<label class="title" for="radio_date_end">Select end date</label>
							<input
								class="input-control"
								v-model="radio_date_end"
								name="radio_date_end"
								id="radio_date_end"
								type="date"
							/>
						</div>
						<div class="item">
							<label class="title" for="record_label">Type record label</label>

							<input
								class="input-control"
								v-model="record_label"
								name="record_label"
								id="record_label"
								type="text"
							/>
						</div>
						<div class="item">
							<button
								class="knapp"
								:class="[is_loading ? 'blå' : 'grön']"
								:disabled="!(radio_date_end && record_label) || is_loading"
								@click.prevent="get_radio_songs()"
							>
								<span v-if="is_loading">Loading!</span>
								<span v-else>Get radio songs</span>
							</button>
							<small>
								<p>
									If this results in an error I am not sure what happens. Call
									the police.
								</p>
							</small>
						</div>
					</div>
				</div>
			</form>
		</div>
		<list class="container"></list>
	</main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import list from './list/index.vue'

export default {
	components: {
		list
	},
	data: () => ({
		radio_date_start: '',
		radio_date_end: '',
		record_label: 'Killander Music Records'
	}),
	computed: {
		...mapGetters([
			'get_channels',
			'get_filter',
			'get_songs',
			'is_loading',
			'get_message'
		])
	},
	methods: {
		...mapActions(['start_scraping']),
		get_radio_songs() {
			return this.start_scraping({
				date_start: this.radio_date_start,
				date_end: this.radio_date_end,
				record_label: this.record_label
			})
		}
	},
	created() {
		const date = new Date()
		const month =
			date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
		this.radio_date_end = `${date.getFullYear()}-${month}-${date.getDate()}`
	}
}
</script>

<style>
.container {
	max-width: 650px;
	margin: 0 auto;
	padding: 0 2.5rem 2.5rem;
}
.group {
	width: 100%;
	display: flex;
	flex-flow: column;
	justify-content: center;
}
.group > .item {
	flex: 100%;
	flex-grow: 1;
	margin: 1rem 0;
}
.knapp {
	width: 100%;
	height: 100%;
	min-height: 4rem;
	display: block;
	border-radius: 0.2rem;
	border: 0;
	border-style: solid;
	border-top-width: 0px;
	border-bottom-width: 4px;
	transition: 0.1s ease-in-out;
	cursor: pointer;
}
.knapp:hover {
	border-top-width: 3px;
	border-bottom-width: 1px;
}
.grön {
	background: var(--main-success);
	color: var(--main-light);
	border-color: var(--main-success-darken);
}
.blå {
	background: var(--main-color);
	color: var(--main-light);
	border-color: var(--main-color-darken);
}
.input-control {
	width: 100%;
	height: 100%;
	min-height: 4rem;
	padding: 1rem;
	display: block;
	border-radius: 0.2rem;
	border: 0;
	border-bottom: 2px solid;
}
</style>
