import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const gearGenerator = async function (file, assetHost) {
  try {
    const gearResponse = await fetch(`${assetHost}/gear/${file}.json?${Date.now()}`)
    const gearResponseJson = await gearResponse.json()
    return gearResponseJson
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function gearHandler(params, request, response) {
  const contentResponses = await Promise.all([
    gearGenerator('gear', Config.get('assetHost')),
    gearGenerator('gear-desc', Config.get('assetHost')),
  ])
  const gear = contentResponses[0]
  const gearDescriptions = contentResponses[1]
  return withGlobalState(request, globalState, {
    title: `Gear ${globalState().title}`,
    gear,
    gearDescriptions,
  })
}
