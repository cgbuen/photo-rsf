import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const makeUsableLinkArray = function(array, assetHost) {
  return array
    .map(link => {
      link.src = `${assetHost}/resources/${link.src}?${link.cache_buster}`
      return link
    })
}

const linkGenerator = async function (assetHost) {
  try {
    const linksResponse = await fetch(`${assetHost}/resources/links.json?${Date.now()}`)
    const linksResponseJson = await linksResponse.json()
    return makeUsableLinkArray(linksResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function softwareHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Resources ${globalState().title}`,
    links: await linkGenerator(Config.get('assetHost')),
  })
}
