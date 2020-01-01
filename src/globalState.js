/**
 * Returns data for the main Menu and NavTabs components
 */
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
    tabs: menu
  }
}
