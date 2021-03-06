import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { channels } from '../assets/radio_channel_ids'

// Create a new store instance.
const store = createStore({
	state: {
		channels: channels,
		filter: {
			date_start: null,
			date_end: null,
			record_label: ''
		},
		songs_found: [],
		loading: false,
		message: {}
	},
	getters: {
		get_channels(state) {
			return state.channels
		},
		get_filter(state) {
			return state.filter
		},
		get_songs(state) {
			return state.songs_found
		},
		is_loading(state) {
			return state.loading
		},
		get_message(state) {
			return state.message
		},
		validate_filters(state, getters) {
			const { date_start, date_end, record_label } = getters.get_filter
			if (
				!date_start.match(/^\d{4}-\d{2}-\d{2}$/m) &&
				!date_end.match(/^\d{4}-\d{2}-\d{2}$/m)
			) {
				return {
					status: false,
					message: {
						text: 'Wrong date format'
					}
				}
			}

			if (!record_label) {
				return {
					status: false,
					message: {
						text: 'No label name'
					}
				}
			}

			return {
				status: true
			}
		}
	},
	mutations: {
		set_filter(state, { date_start = '', date_end = '', record_label = '' }) {
			state.filter = {
				date_start,
				date_end,
				record_label
			}
		},
		set_songs_found(state, songs) {
			state.songs_found.push(songs)
		},
		set_loading(state, load) {
			state.loading = load
		},
		set_message(state, message) {
			state.message = message
		}
	},
	actions: {
		async retrive_radio_channels({ commit, dispatch }) {
			const list = channels.map(
				({ id, name }) =>
					new Promise((resolve, reject) =>
						dispatch('get_radio_channel', { id, name })
							.then((songs = []) => {
								if (songs.length === 0) {
									return resolve()
								}

								return resolve(songs)
							})
							.catch((error) => reject(error))
					)
			)
			return await Promise.all(list)
		},
		/**
		 * @description Get one specific radio channels music list
		 * @param {Object} data
		 * @param {Number} data.id A numeric value representing the radio channel.
		 * @param {String} data.name A string value representing the radio channel.
		 * @returns An array of objects containing the songs played on that channel that day.
		 */
		async get_radio_channel({ getters, commit }, data = {}) {
			const { id, name } = data
			const { date_start, date_end, record_label } = getters.get_filter

			return await fetch(
				`https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id}&startdatetime=${date_start}&endDateTime=${date_end}&size=100000&format=json`,
				{
					method: 'GET'
				}
			)
				.then((response) => response.json())
				.then(({ song = [] }) =>
					song.filter(({ recordlabel = '' }) => recordlabel.match(record_label))
				)
				.then((filtered_songs) => {
					return filtered_songs.map((song) => {
						song.radioid = id
						song.radioname = name
						console.log(song)
						commit('set_songs_found', song)
					})
				})
				.catch((err) => err)
		},
		start_scraping({ dispatch, commit, getters }, data) {
			commit('set_filter', data)
			const { status, message } = getters.validate_filters
			console.log(status)
			if (status) {
				commit('set_loading', true)
				return dispatch('retrive_radio_channels').finally(() =>
					commit('set_loading', false)
				)
			} else {
				return commit('set_message', message)
			}
		}
	},
	plugins: [createPersistedState()]
})

export default store
