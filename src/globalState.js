import Config from 'react-storefront/Config'

export default () => {
  const menu = {
    root: true,
    items: [
      {
        text: 'Works',
        prefetch: 'visible',
        url: '/works'
      },
      {
        text: 'Photography',
        prefetch: 'visible',
        url: '/photography'
      },
      {
        text: 'Collection',
        prefetch: 'visible',
        url: '/collection'
      },
      {
        text: 'About',
        prefetch: 'visible',
        url: '/about'
      },
      {
        text: 'Miscellaneous',
        prefetch: 'visible',
        url: '/misc'
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
      email: 'christopherbuenaventura@gmail.com',
      linkedin: 'https://www.linkedin.com/in/christopherbuenaventura/',
      twitch: 'https://www.twitch.tv/cgbuen',
      twitter: 'https://twitter.com/cgbuen',
      github: 'https://github.com/cgbuen',
      youtube: 'https://www.youtube.com/cgbuen',
      discordP: 'cgbuen#5518',
      discordS: 'https://discord.gg/EayZKHK',
    },
    projects: [],
    photos: [],
    builds: [],
  }
}
