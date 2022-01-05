import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const makeUsablePlateArray = function(array, assetHost) {
  return array
    .map(link => {
      link.src = link.src === 'n/a' ? link.src : `${assetHost}/plates/${link.src}.svg?${link.cache_buster}`
      return link
    })
}

const platesGenerator = async function (file, assetHost) {
  try {
    const platesResponse = await fetch(`${assetHost}/plates/${file}.json?${Date.now()}`)
    const platesResponseJson = await platesResponse.json()
    return makeUsablePlateArray(platesResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function platesHandler(params, request, response) {
  const contentResponses = await Promise.all([
    platesGenerator('plates', Config.get('assetHost')),
  ])
  const plates = contentResponses[0]
  return withGlobalState(request, globalState, {
    title: `Plates ${globalState().title}`,
    plates
  })
}
