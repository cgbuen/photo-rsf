import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const makeUsablePhotoArray = function(array, assetHost) {
  return array
    .filter(photo => photo.active)
    .map(photo => {
      photo.src = `${assetHost}/concerts/${photo.roll}+${photo.number}.jpg?${photo.cacheBuster}`
      photo.alt = `${photo.subject}, ${photo.venue}, ${photo.date}`
      return photo
    })
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
