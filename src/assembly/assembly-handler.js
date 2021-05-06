import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import builds from './builds'
import Config from 'react-storefront/Config'

export default async function assemblyHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Software ${globalState().title}`,
    builds: await builds(Config.get('assetHost'))
  })
}
