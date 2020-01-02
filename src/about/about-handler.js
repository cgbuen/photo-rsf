import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function homeHandler(params, request, response) {
  console.log('asdfg')
  return withGlobalState(request, globalState, {
    title: `About ${globalState().title}`,
    about: {
      bio: `Christopher Buenaventura (cgbuen, cg, Chris) shoots film from the pit. He is also a software engineer by day and plays Splatoon on Twitch on off days.`,
      link: `http://www.christopherbuenaventura.com/`,
    }
  })
}
