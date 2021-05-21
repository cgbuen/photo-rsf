import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default async function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Home ${globalState().title}`,
  })
}
