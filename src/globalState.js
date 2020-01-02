export default () => {
  const menu = {
    root: true,
    items: [{
        text: 'Gallery',
        prefetch: 'visible',
        url: '/'
      },
      {
        text: 'About',
        prefetch: 'visible',
        url: '/about'
      },
      {
        text: 'Inquiries',
        prefetch: 'visible',
        url: '/inquiries'
      }
    ]
  }

  return {
    menu: {
      levels: [menu]
    },
    tabs: menu,
    title: '– cgbuen Concert Photography',
    social: {
      instagram: 'https://www.instagram.com/cgbuen/',
      email: 'christopherbuenaventura@gmail.com',
      linkedin: 'https://www.linkedin.com/in/christopherbuenaventura/',
      twitch: 'https://www.twitch.tv/cgbuen',
      twitter: 'https://twitter.com/cgbuen',
      github: 'https://github.com/cgbuen',
      website: 'http://www.christopherbuenaventura.com/',
    },
    photos: []
  }
}
