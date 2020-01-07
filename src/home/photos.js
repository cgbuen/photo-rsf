import fetch from 'fetch'

const shuffle = function(array) {
  console.log('--> Shuffling photos')
  var currentIndex = array.length, temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

const makeUsablePhotoArray = function(array, assetHost) {
  return array
    .filter(photo => photo.active)
    .map(photo => {
      photo.src = `${assetHost}/${photo.roll}+${photo.number}.jpg?2020010600`
      photo.alt = `${photo.subject}, ${photo.venue}, ${photo.date}`
      return photo
    })
}

export default async function photoGenerator(assetHost) {
  try {
    const photosResponse = await fetch(`${assetHost}/photos.json`)
    const photosResponseJson = await photosResponse.json()
    return shuffle(makeUsablePhotoArray(photosResponseJson, assetHost))
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}
