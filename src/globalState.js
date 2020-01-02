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
        url: '/contact'
      }
    ]
  }

  return {
    menu: {
      levels: [menu]
    },
    tabs: menu,
    title: '– cgbuen Concert Photography',
    about: {},
    contact: {},
    photos: []
  }
}
