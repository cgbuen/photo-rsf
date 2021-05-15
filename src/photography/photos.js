import fetch from 'fetch'

const makeUsablePhotoArray = function(array, assetHost) {
  return array
    .filter(photo => photo.active)
    .map(photo => {
      photo.src = `${assetHost}/${photo.roll}+${photo.number}.jpg?${photo.cacheBuster}`
      photo.alt = `${photo.subject}, ${photo.venue}, ${photo.date}`
      return photo
    })
}

export default async function photoGenerator(assetHost) {
  try {
    const photosResponse = await fetch(`${assetHost}/concerts/concerts.json?${Date.now()}`)
    const photosResponseJson = await photosResponse.json()
    return makeUsablePhotoArray(photosResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}
