import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'
import { createOptimizedSrc } from 'react-storefront/imageService'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const makeUsablePhotoArray = function(array, assetHost) {
  const newArray = array
    .filter(photo => photo.active)
    .map(photo => {
      photo.src = createOptimizedSrc(`${assetHost}/concerts/${photo.roll}+${photo.number}.jpg?${photo.cacheBuster}`, { quality: Config.get('imageQuality') })
      photo.alt1 = `${photo.subject}${(photo.venue && photo.venue.includes('n/a')) ? '' : ` @ ${photo.venue}`}`
      photo.alt2 = photo.city === 'Coachella' ? `${photo.city} ${photo.date.substring(0, 4)}` : `${photo.city}, ${MONTHS[parseInt(photo.date.substring(5, 7)) - 1]} ${photo.date.substring(0, 4)}`
      photo.alt = `${photo.alt1}, ${photo.alt2}`
      return photo
    })
  return newArray
}

const photoGenerator = async function(assetHost) {
  try {
    const photosResponse = await fetch(`${assetHost}/concerts/concerts.json?${Date.now()}`)
    const photosResponseJson = await photosResponse.json()
    return makeUsablePhotoArray(photosResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function photographyHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Photography ${globalState().title}`,
    photos: await photoGenerator(Config.get('assetHost'))
  })
}
