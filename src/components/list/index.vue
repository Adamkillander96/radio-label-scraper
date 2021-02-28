<template>
	<section class="container" v-if="songs">
		<h2>A list of the requests you have made</h2>
		<p>
			When you have made a request, wait for the page to reload and it will
			appear here
		</p>
		<article v-for="(label_name, key) in songs" :key="key">
			<header>
				<h4>{{ key }}</h4>
			</header>
			<section v-for="(channel, key) in label_name" :key="key">
				<details>
					<summary>{{ key }} ({{ channel.length }})</summary>
					<div v-for="(song, key) in channel" :key="key" class="">
						<template v-for="(info, key) in song">
							<p v-if="info" :key="key">
								{{ key }}:
								{{ info.match(/\/Date\(/) ? clean_date(info) : info }}
							</p>
						</template>
					</div>
				</details>
			</section>
		</article>
	</section>
</template>

<script>
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
		songs() {
			var i,
				songs = {}
			for (i in localStorage) {
				if (localStorage.hasOwnProperty(i)) {
					if (
						i.match(/-\d{4}-\d{2}-\d{2}$/m) ||
						(!/-d{4}-\d{2}-\d{2}$/m && typeof i === 'string')
					) {
						songs[i] = JSON.parse(localStorage.getItem(i))
					}
				}
			}
			return songs
		}
	}
}
</script>
