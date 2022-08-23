import Config from 'react-storefront/Config'

export default () => {
  const menu = {
    root: true,
    items: [
      {
        text: 'Software',
        prefetch: 'visible',
        url: '/projects'
      },
      {
        text: 'Concerts',
        prefetch: 'visible',
        url: '/photography'
      },
      {
        text: 'Keyboards',
        prefetch: 'visible',
        url: '/collection'
      },
      {
        text: 'About',
        prefetch: 'visible',
        url: '/about'
      },
      {
        text: 'Commissions',
        prefetch: 'visible',
        url: '/commissions',
      },
      {
        text: 'Resources',
        prefetch: 'visible',
        url: '/resources'
      },
    ]
  }

  return {
    menu: {
      levels: [menu]
    },
    tabs: menu,
    title: '– cgbuen',
    config: Config.values,
    social: {
      instagram: 'https://www.instagram.com/cgbuen/',
      email: 'chris@cgbuen.io',
      linkedin: 'https://www.linkedin.com/in/christopherbuenaventura/',
      twitch: 'https://www.twitch.tv/cgbuen',
      twitter: 'https://twitter.com/cgbuen',
      github: 'https://github.com/cgbuen',
      youtubeM: 'https://www.youtube.com/cgbuen',
      youtubeV: 'https://www.youtube.com/channel/UC5TYwKPKxwWl4IY9We5U0OQ',
      discordP: 'cgbuen#5518',
      discordS: 'https://discord.gg/EayZKHK',
      sffb: 'https://us-p2p.netdonor.net/1803/general/61375/cgbuen',
    },
    projects: [],
    photos: [],
    links: [],
    commands: [],
    gear: [],
    gearDescriptions: [],
    builds: [],
    buildFiltersActive: {},
  }
}
