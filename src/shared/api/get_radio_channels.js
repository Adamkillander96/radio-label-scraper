import { useFilters } from '../../store/filters'
import { channels } from '../data/radio_channel_ids'
import { fullDate } from '../date'

export async function retrive_all_radio_channels({ dates }) {
  const list = channels.map(
    async ({ id, name }) =>
      await Promise.all(
        dates.map(async (date) => await get_radio_channel({ id, name, date }))
      )
  )

  return await Promise.all(list)
}

/**
 * @description Get one specific radio channels music list
 * @param {Object} data
 * @param {Number} data.id A numeric value representing the radio channel.
 * @param {String} data.name A string value representing the radio channel.
 * @returns An array of objects containing the songs played on that channel that day.
 */
export async function get_radio_channel({ id, name, date }) {
  const { week, record_label } = useFilters()

  return await fetch(
    `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id}&size=1000&format=json&startDateTime=${date}`,
    {
      method: 'GET'
    }
  )
    .then((response) => response.json())
    .then(({ song = [] }) =>
      song.filter(({ recordlabel = '' }) => recordlabel.match(record_label))
    )
    .then((filtered_songs) =>
      filtered_songs?.map((song) => ({
        ...song,
        starttimeutc: fullDate(Number(song.starttimeutc.replace(/\D/g, ''))),
        stoptimeutc: fullDate(Number(song.stoptimeutc.replace(/\D/g, ''))),
        radioid: id,
        radioname: name,
        week,
        song_id: `${week}-${record_label.replaceAll(' ', '-')}`
      }))
    )
    .catch((err) => console.error(err))
}
