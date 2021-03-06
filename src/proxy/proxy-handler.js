import renderPWAComponents from './renderPWAComponents'
import getStats from 'react-storefront-stats'

export default async function proxyHandler(params, request, response) {
  const contentType = env.content_type || ''

  if (/(?!^)\/($|\?)/.test(env.path)) {
    response.redirect(env.path.replace(/\/($|\?)/, '$1'))
  } else if (contentType.indexOf('html') > -1) {
    const stats = await getStats()
    fns.init$(body)
    await renderPWAComponents(stats) // reuse the PWA header in legacy pages
    response.send($.html())
  } else {
    sendResponse({ htmlparsed: false })
  }
}
