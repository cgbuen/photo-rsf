import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import photos from './photos'
import Config from 'react-storefront/Config'

export default function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Home ${globalState().title}`,
    photos: photos(Config.get('assetHost'))
  })
}
