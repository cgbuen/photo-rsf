import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import photos from './photos'
import Config from 'react-storefront/Config'

export default async function photographyHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Photography ${globalState().title}`,
    photos: await photos(Config.get('assetHost'))
  })
}
