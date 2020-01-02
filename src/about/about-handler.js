import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function aboutHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `About ${globalState().title}`,
  })
}
