import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default async function miscHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Miscellaneous ${globalState().title}`,
  })
}
