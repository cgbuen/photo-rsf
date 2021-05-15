import fetch from 'fetch'

const makeUsableBuildArray = function(array, assetHost) {
  return array
    .map(build => {
      build.src = `${assetHost}/${build.src}.jpg`
      return build
    })
}

export default async function buildGenerator(assetHost) {
  try {
    const buildsResponse = await fetch(`${assetHost}/keyboards/keyboards.json?${Date.now()}`)
    const buildsResponseJson = await buildsResponse.json()
    return makeUsableBuildArray(buildsResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}
