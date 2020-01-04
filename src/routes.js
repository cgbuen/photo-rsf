import { Router, fromClient, fromServer, cache, proxyUpstream } from 'react-storefront/router'

// See guide to caching on Moov XDN: https://pwa.moovweb.com/guides/caching
const cacheHandler = cache({
  edge: { maxAgeSeconds: 60 * 60 * 24 }, // cache on the network edge for 24 hours
  client: true // cache on the client using the service worker
})

// See guide to routing: https://pwa.moovweb.com/guides/routing
export default new Router()
  .appShell(
    // returns only the global data needed to build the app-shell for offline support
    cacheHandler,
    fromServer('./app-shell/app-shell-handler')
  )
  .get('/', fromClient({ page: 'Home' }), fromServer('./home/home-handler'))
  .get('/about', cacheHandler, fromClient({ page: 'About' }), fromServer('./about/about-handler'))
  .get('/inquiries', cacheHandler, fromClient({ page: 'Inquiries' }), fromServer('./inquiries/inquiries-handler'))
  .fallback(
    // when no route matches, pull in content from the upstream site
    // for a working example, go to /help/home
    proxyUpstream('./proxy/proxy-handler')
  )
