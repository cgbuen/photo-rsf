import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import photos from './photos'

export default function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Home ${globalState().title}`,
    photos
  })
}
