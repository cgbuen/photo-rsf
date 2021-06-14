import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const makeUsableBuildArray = function(array, assetHost, filter) {
  return array
    .map(build => {
      build.src = `${assetHost}/keyboards/${build.src}.jpg?${build.cache_buster}`
      if (build.assembly_variant.includes('A') && build.build_status === filter) {
        build.loaded = true
        build.active = true
      }
      if (!build.cache_buster) {
        build.cache_buster = null
      }
      return build
    })
    .sort((x, y) => {
      const useDateX = ['TBD', 'N/A'].includes(x.date_built) ? x.date_bought: x.date_built
      const useDateY = ['TBD', 'N/A'].includes(y.date_built) ? y.date_bought: y.date_built
      return useDateX.localeCompare(useDateY)
    })
    .reverse()
}

const buildGenerator = async function (assetHost, filter) {
  try {
    const buildsResponse = await fetch(`${assetHost}/keyboards/collection.json?${Date.now()}`)
    const buildsResponseJson = await buildsResponse.json()
    return makeUsableBuildArray(buildsResponseJson, assetHost, filter)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function collectionHandler(params, request, response) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let filter = capitalize(params.filter || '')
  if (!filter || !['Built', 'Prebuilt', 'Vintage', 'Unbuilt', 'On the way'].includes(decodeURIComponent(filter))) {
    filter = 'Built'
  }
  return withGlobalState(request, globalState, {
    title: `Collection ${globalState().title}`,
    builds: await buildGenerator(Config.get('assetHost'), filter),
    buildFiltersActive: {[filter]: true},
    openBuild: {},
  })
}
