import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const makeUsableBuildArray = function(array, assetHost) {
  return array
    .map(build => {
      build.src = `${assetHost}/keyboards/${build.src}.jpg?${build.cache_buster}`
      if (build.assembly_variant.includes('A') && build.build_status === 'Built') {
        build.loaded = true
        build.active = true
      }
      return build
    })
    .reverse()
}

const buildGenerator = async function (assetHost) {
  try {
    const buildsResponse = await fetch(`${assetHost}/keyboards/collection.json?${Date.now()}`)
    const buildsResponseJson = await buildsResponse.json()
    return makeUsableBuildArray(buildsResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function collectionHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Collection ${globalState().title}`,
    builds: await buildGenerator(Config.get('assetHost')),
    buildFiltersActive: {'Built': true},
    openBuild: {},
  })
}
