import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import Header from './header/Header'
import Footer from './footer/Footer'
import Pages from 'react-storefront/Pages'
import Helmet from 'react-helmet'
import Offline from './components/Offline'
import SimpleReactLightbox from 'simple-react-lightbox'
import AnalyticsProvider from 'react-storefront/AnalyticsProvider'
import TrackPageViews from 'react-storefront-extensions/TrackPageViews'
import targets from './analytics'

@withStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#151515 !important',
      color: 'white',
      margin: '0',
      padding: '0',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      width: '100%',
    },
    a: {
      textDecoration: 'underline',
    },
    '#SRLLightbox button': {
      borderRadius: '50%',
    },
  }
}))
@inject('app')
@observer
export default class App extends Component {
  render() {
    const { app } = this.props
    return (
      <AnalyticsProvider targets={targets(app.config)}>
        <TrackPageViews>
          <SimpleReactLightbox>
            <div>
              <Helmet>
                {/**
                 * This tag allows us to start the connection with the Moovweb
                 * Optimization server as soon as the browser parses the HTML.
                 *
                 * Preconnect allows the browser to setup early connections
                 * before an HTTP request is actually sent to the server.
                 *
                 * In turn, image optimization requests will be faster.
                 *
                 * If your project does not use this optimization service, this
                 * tag can be removed.
                 */}
                <link href="https://opt.moovweb.net" rel="preconnect" crossorigin />
                <link rel="stylesheet" href="https://use.typekit.net/kgo8rkq.css" />
                <link rel="shortcut icon" href="/icons/favicon.ico?v=2021052000" />
                <meta
                  name="description"
                  content="cgbuen - Software Engineer, Photographer, Builder, Content Creator."
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
              </Helmet>
              <Header />
              <Pages
                components={universal => ({
                  Home: universal(import('./home/Home')),
                  Projects: universal(import('./projects/Projects')),
                  Photography: universal(import('./photography/Photography')),
                  Collection: universal(import('./collection/Collection')),
                  About: universal(import('./about/About')),
                  Commissions: universal(import('./commissions/Commissions')),
                  Resources: universal(import('./resources/Resources')),
                  Commands: universal(import('./resources/Commands')),
                  Gear: universal(import('./resources/Gear')),
                  Plates: universal(import('./resources/Plates')),
                  Error: universal(import('./ErrorPage')),
                  Offline
                })}
              />
              <Footer />
            </div>
          </SimpleReactLightbox>
        </TrackPageViews>
      </AnalyticsProvider>
    )
  }
}
