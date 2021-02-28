import { channels } from '../assets/radio_channel_ids'

/**
 * @description Get one specific radio channels music list
 * @param {Object} data
 * @param {Number} data.id A numeric value representing the radio channel.
 * @returns An array of objects containing the songs played on that channel that day.
 */
const get_radio_channel = async (data = {}) => {
	const { id } = data
	const { date_start, date_end, record_label } = radio.info

	return await fetch(
		`https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id}&startdatetime=${date_start}&endDateTime=${date_end}&size=9999&format=json`,
		{
			method: 'GET'
		}
	)
		.then((response) => response.json())
		.then(({ songs = [] }) =>
			songs.filter(({ recordlabel = '' }) => recordlabel.match(record_label))
		)
		.catch((err) => err)
}

const check_local_storage = () => {
	const { date_start, date_end, record_label } = radio.info

	const name = `${record_label}-${date_start}-${date_end}`
	return localStorage[name] && JSON.parse(localStorage[name])
}

/**
 * @description Retrive all the radio channels songlist
 * @param {String} date
 */
const get_songs = async () => {
	const { date_start = '', date_end = '', record_label = '' } = radio.info
	if (
		!date_start.match(/^\d{4}-\d{2}-\d{2}$/m) &&
		!date_end.match(/^\d{4}-\d{2}-\d{2}$/m)
	) {
		console.log('Fel format yo')
		return
	}

	if (!record_label) {
		console.log('Skriv in ett label pls')
		return
	}

	const radio_storage = check_local_storage()
	if (radio_storage) {
		console.log('Redan cachat! Nice va? :D ')
		return radio_storage
	}

	const all_songs = {}

	const list = channels.map(({ id, name }) => {
		return new Promise((resolve, reject) => {
			get_radio_channel({ id })
				.then((songs) => {
					console.log(songs)
					if (songs.length === 0) {
						return resolve()
					}
					all_songs[name] = songs
					return resolve(songs)
				})
				.catch((error) => reject(error))
		})
	})

	await Promise.all(list)

	localStorage.setItem(
		`${record_label
			.toLowerCase()
			.replaceAll(' ', '-')}-${date_start}-${date_end}`,
		JSON.stringify(all_songs)
	)

	return location.reload()
}

export const radio = {
	get_songs,
	info: {}
}
