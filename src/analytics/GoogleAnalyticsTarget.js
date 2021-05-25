import CommerceAnalyticsTarget from 'react-storefront-extensions/CommerceAnalyticsTarget'

/**
 * Provides integration with Google Analytics.  Example usage:
 *
 *  import { configureAnalytics } from 'react-storefront/analytics'
 *  import GoogleTagManagerTarget from 'react-storefront-extensions/GoogleTagManagerTarget'
 *
 *  configureAnalytics(
 *    new GoogleTagManagerTarget({
 *      trackingID: 'ABC123' // your tracking id
 *    })
 *  )
 */

export default class GoogleAnalyticsTarget extends CommerceAnalyticsTarget {
  /**
   * @param {Object} config
   * @param {String} config.trackingID Your google analytics tracking id
   * @param {String} config.globalObjectName The name for the google analytics global object.  Defaults to "ga"
   * @param {Boolean} config.trace Set to true to turn on trace level logging.
   * @param {Boolean} config.sendTimingAsHits Set to true to send timing data as hit events in addition to timing events
   * @param {Boolean} config.useBeacon Set to true to use beacon as the transport mechanism when available
   * @param {Boolean} config.useAmpClientId Opt in to Google AMP Client ID API. Defaults to true
   */
  constructor({
    trackingID,
    globalObjectName = 'ga',
    trace = false,
    sendTiming = false,
    sendTimingAsHits = false,
    useBeacon = false,
    useAmpClientId = true
  }) {
    super()

    if (!trackingID) throw new Error('trackingID is required.')

    this.globalObjectName = globalObjectName
    this.trackingID = trackingID
    this.sendTiming = sendTiming
    this.sendTimingAsHits = sendTimingAsHits

    if (!this.isAmp()) {
      this.injectCodeInHead(`
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','${globalObjectName}');
        
        ${globalObjectName}('create', '${trackingID}', 'auto', { useAmpClientId: ${useAmpClientId.toString()} });
      `)

      if (trace) {
        window.ga_debug = { trace }
      }

      if (useBeacon) {
        this.ga('set', 'transport', 'beacon')
      }

      this.sendForAllEvents()
    }
  }

  gaAmpStub = () => {}

  get ga() {
    if (this.isAmp()) {
      return this.gaAmpStub
    }
    return window[this.globalObjectName]
  }

  send({ event, timing, ...customDimensions }) {
    setImmediate(() => {
      const { ga, sendTimingAsHits } = this

      if (event === 'pageview') {
        ga('set', 'page', window.location.pathname + window.location.search)
      }

      if (timing) {
        for (let key in timing) {
          const value = timing[key]

          if (value != null) {
            ga('send', 'timing', 'Moov XDN Timing', key, value)

            if (sendTimingAsHits) {
              // In order to extract individual timing values in GA's reporting
              // we have to improperly use the event label to hold timing data
              // and not the value field as you would normally expect.
              // https://stackoverflow.com/questions/32481957/how-to-get-raw-user-timings-data-using-google-analytics-core-reporting-api#comment56080421_32481957
              ga('send', 'event', 'Moov XDN Timing', key, value, 1)
            }
          }
        }
      }

      ga('send', event, customDimensions)
    })
  }

  getAmpAnalyticsType() {
    return 'googleanalytics'
  }

  getAmpAnalyticsData(app) {
    return {
      vars: {
        account: app.config.gaApiKey
      }
    }
  }

  filterClick({ name, filterStatus }) {
    this.send({
      event: 'filterClick',
      dimension1: name,
      dimension2: filterStatus,
    }) 
  }

  keyboardClick({ name }) {
    this.send({
      event: 'keyboardClick',
      dimension1: name,
    }) 
  }

  modalIconClick({ name, iconType }) {
    this.send({
      event: 'modalIconClick',
      dimension1: name,
      dimension3: iconType,
    }) 
  }
}
