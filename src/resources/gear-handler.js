import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const gearGenerator = async function (assetHost) {
  try {
    const gearResponse = await fetch(`${assetHost}/gear/gear.json?${Date.now()}`)
    const gearResponseJson = await gearResponse.json()
    return gearResponseJson
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function gearHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Gear ${globalState().title}`,
    gear: await gearGenerator(Config.get('assetHost')),
  })
}
