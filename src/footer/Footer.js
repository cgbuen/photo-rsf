import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Link from 'react-storefront/Link'
import Instagram from '../assets/instagram.svg'
import YouTube from '../assets/youtube.svg'
import Twitter from '../assets/twitter.svg'
import Twitch from '../assets/twitch.svg'
import GitHub from '../assets/github.svg'
import Discord from '../assets/discord.svg'
import Mail from '@material-ui/icons/MailOutline'
import classnames from 'classnames'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@withStyles(theme => ({
  root: {
    background: '#222',
    bottom: 0,
    maxWidth: 'none',
    textAlign: 'center',
    width: '100%',
  },
  line: {
    display: 'inline-block',
  },
  iconWrapper: {
    color: 'white',
    display: 'inline-block',
    height: 32,
    margin: '0 5px',
    padding: 5,
    verticalAlign: 'middle',
    width: 32,
    '@media (max-width:568px)': {
      height: 48,
      margin: '0 8px',
      width: 48,
    }
  },
  iconWrapperMail: {
    padding: 3
  },
  icon: {
    fill: 'currentColor',
    height: '100%',
    userSelect: 'none',
    width: '100%',
  },
}))
@inject(({ app }) => ({ social: app.social }))
@observer
export default class Footer extends Component {
  render() {
    const { classes, social } = this.props
    return (
      <Container className={classes.root}>
        <Row className={classes.social}>
          <div className={classes.line}>
            <Link server to={social.twitch} className={classes.iconWrapper}>
              <Twitch className={classes.icon} />
            </Link>
            <Link server to={social.instagram} className={classes.iconWrapper}>
              <Instagram className={classes.icon} />
            </Link>
            <Link server to={social.youtubeV} className={classes.iconWrapper}>
              <YouTube className={classes.icon} />
            </Link>
            <Link server to={social.github} className={classes.iconWrapper}>
              <GitHub className={classes.icon} />
            </Link>
          </div>
          <div className={classes.line}>
            <Link server to={social.discordS} className={classes.iconWrapper}>
              <Discord className={classes.icon} />
            </Link>
            <Link server to={social.twitter} className={classes.iconWrapper}>
              <Twitter className={classes.icon} />
            </Link>
            <Link server to={`mailto:${social.email}`} className={classnames(classes.iconWrapperMail, classes.iconWrapper)}>
              <Mail className={classes.icon} />
            </Link>
          </div>
        </Row>
        <Row className={classes.copyright}>
          &copy; {(new Date()).getYear() + 1900} Christopher Buenaventura
        </Row>
      </Container>
    )
  }
}
