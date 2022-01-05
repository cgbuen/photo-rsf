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
    return buildsResponseJson
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function collectionHandler(params, request, response) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const assetHost = Config.get('assetHost')
  let filter = capitalize(params.filter || 'Built')
  if (!['Built', 'Prebuilt', 'Vintage', 'Unbuilt', 'On the way'].includes(decodeURIComponent(filter))) {
    filter = 'Built'
  }
  const allBuilds = await buildGenerator(assetHost, filter)
  const enough = allBuilds.filter(x => x.build_status === decodeURIComponent(filter) && x.assembly_variant.includes('A')).length > 0
  if (!enough) {
    filter = 'Built'
  }
  const builds = makeUsableBuildArray(allBuilds, assetHost, filter)
  return withGlobalState(request, globalState, {
    title: `Collection ${globalState().title}`,
    builds,
    buildFiltersActive: {[filter]: true},
    openBuild: {},
  })
}
