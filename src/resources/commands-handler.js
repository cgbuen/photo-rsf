import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const commandGenerator = async function (assetHost) {
  try {
    const commandsResponse = await fetch(`${assetHost}/chatbot/commands.json?${Date.now()}`)
    const commandsResponseJson = await commandsResponse.json()
    return commandsResponseJson
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function softwareHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Commands ${globalState().title}`,
    commands: await commandGenerator(Config.get('assetHost')),
  })
}
