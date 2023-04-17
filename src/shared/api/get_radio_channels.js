import { channels } from '../data/radio_channel_ids'

export async function retrive_all_radio_channels({ dates, record_label }) {
  const list = channels.map(
    async ({ id, name }) =>
      await Promise.all(
        dates.map(
          async (date) =>
            await get_radio_channel({ id, name, date, record_label })
        )
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
export async function get_radio_channel({ id, name, date, record_label }) {
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
    .then(
      (filtered_songs) =>
        filtered_songs?.map((song) => ({
          ...song,
          radioid: id,
          radioname: name
        }))
    )
    .catch((err) => console.error(err))
}
