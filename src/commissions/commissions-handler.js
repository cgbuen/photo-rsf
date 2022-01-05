import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function commissionsHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Commissions ${globalState().title}`,
  })
}
