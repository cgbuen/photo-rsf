import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function inquiriesHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Inquiries ${globalState().title}`,
  })
}