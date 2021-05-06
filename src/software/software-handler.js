import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import projects from './projects'
import Config from 'react-storefront/Config'

export default async function softwareHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Software ${globalState().title}`,
    projects: await projects(Config.get('assetHost'))
  })
}
