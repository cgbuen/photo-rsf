import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `About ${globalState().title}`,
    about: {
      bio: `Christopher Buenaventura (cgbuen, cg, Chris) shoots film from the pit at live Bay Area events. He is also a software engineer by day and plays Splatoon on Twitch during off days.`,
      link: `http://www.christopherbuenaventura.com/`,
    }
  })
}
