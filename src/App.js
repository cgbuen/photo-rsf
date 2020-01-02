import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import Header from './header/Header'
import Footer from './footer/Footer'
import Pages from 'react-storefront/Pages'
import Helmet from 'react-helmet'
import Offline from 'react-storefront/Offline'

@withStyles(theme => ({
  '@global': {
    body: {
      background: 'white',
      color: '#222',
      margin: '0',
      padding: '0',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      width: '100%',
    },
    a: {
      textDecoration: 'underline'
    }
  }
}))
@inject('app')
@observer
export default class App extends Component {
  render() {
    return (
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
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <meta
            name="description"
            content="Bay Area Concert Photography by cgbuen (Christopher Buenaventura)."
          />
        </Helmet>
        <Header />
        <Pages
          components={universal => ({
            Home: universal(import('./home/Home')),
            About: universal(import('./about/About')),
            Inquiries: universal(import('./inquiries/Inquiries')),
            Error: universal(import('./ErrorPage')),
            Offline
          })}
        />
        <Footer />
      </div>
    )
  }
}
