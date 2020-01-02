import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Contact ${globalState().title}`,
    contact: {
      instagram: 'https://www.instagram.com/cgbuen/',
      email: 'christopherbuenaventura@gmail.com',
      linkedin: 'https://www.linkedin.com/in/christopherbuenaventura/',
      twitch: 'https://www.twitch.tv/cgbuen',
      twitter: 'https://twitter.com/cgbuen',
      github: 'https://github.com/cgbuen',
      website: 'http://www.christopherbuenaventura.com/',
    }
  })
}
