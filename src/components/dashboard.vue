<template>
	<main>
		<div class="container">
			<h1>Radio Kollen</h1>
			<p>
				With this tool, you can select a date range and a record label name to
				find out if that label played any songs on the swedish radio channel P4.
				We search all of the channels regions so you don't have to manually
				search every dang page.
			</p>
			<details>
				<summary>The list of all the channels we scrape</summary>
				<ul>
					<li v-for="({ name, id }, key) in channels" :key="key">
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
							<label class="title" for="record_label">Select start date</label>
							<input
								class="input-control"
								v-model="radio_date_start"
								name="radio_date"
								type="date"
							/>
						</div>
						<div class="item">
							<label class="title" for="record_label">Select end date</label>
							<input
								class="input-control"
								v-model="radio_date_end"
								name="radio_date"
								type="date"
							/>
						</div>
						<div class="item">
							<label class="title" for="record_label">Type record label</label>

							<input
								class="input-control"
								v-model="record_label"
								name="record_label"
								type="text"
							/>
						</div>
						<div class="item">
							<button
								class="knapp"
								:disabled="!(radio_date_end && record_label)"
								@click.prevent="get_radio_songs()"
							>
								Get radio songs
							</button>
							<p>
								When you have clicked the button, just wait. I did not bother
								with a proper loading button. The page will refresh itself.
							</p>
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
import { radio } from '../api/radio.js'
import { channels } from '../assets/radio_channel_ids'

import list from './list/index.vue'
export default {
	components: {
		list
	},
	data: () => ({
		radio_date_start: '',
		radio_date_end: '',
		record_label: 'Killander Music Records',
		channels
	}),
	computed: {
		is_loading() {
			return radio.loading
		}
	},
	methods: {
		get_radio_songs() {
			radio.info = {
				date_start: this.radio_date_start,
				date_end: this.radio_date_end,
				record_label: this.record_label
			}
			radio.get_songs()
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
	padding: 0 2.5rem;
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
	border-bottom: 2px solid;
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
