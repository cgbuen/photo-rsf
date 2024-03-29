import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import Link from 'react-storefront/Link'
import LinkBlank from '../components/LinkBlank'
import classnames from 'classnames'
import Instagram from '../assets/instagram.svg'
import YouTube from '../assets/youtube.svg'
import Twitter from '../assets/twitter.svg'
import Twitch from '../assets/twitch.svg'
import GitHub from '../assets/github.svg'
import Discord from '../assets/discord.svg'
import { createOptimizedSrc } from 'react-storefront/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'
@withStyles(
  theme => ({
    heroContainer: {
      backgroundImage: `url(${createOptimizedSrc(ASSET_DOMAIN + '/hero-1.jpg?2021052006', { quality: 90 })})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: 1228,
      position: 'relative',
      '@media (max-width:1920px)': {
        height: 'auto',
        padding: '32%',
      },
      '@media (max-width:1080px)': {
        height: 689,
        padding: 0,
      },
    },
    heroImage: {
      width: '100%'
    },
    heroTextContainer: {
      background: 'rgba(128, 128, 128, .5)',
      borderRadius: 3,
      fontWeight: 'bold',
      left: '57%',
      lineHeight: 2,
      overflow: 'hidden',
      padding: 20,
      position: 'absolute',
      top: '45%',
      transform: 'translateY(-60%)',
      '@media (max-width:1080px)': {
        top: '58%',
      },
      '@media (max-width:768px)': {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }
    },
    iconRow: {
      bottom: '15%',
      position: 'absolute',
      right: '15%',
      '@media (max-width:1080px)': {
        display: 'none',
      },
    },
    heroBox: {
      display: 'none',
      marginTop: 15,
      position: 'static',
      textAlign: 'center',
      '@media (max-width:1080px)': {
        display: 'block',
      },
    },
    line: {
      display: 'inline-block',
      '@media (max-width:1080px), (min-width:1920px)': {
        display: 'block',
      },
    },
    iconWrapper: {
      color: 'white',
      display: 'inline-block',
      height: 48,
      margin: '0 8px',
      padding: 5,
      verticalAlign: 'middle',
      width: 48,
      '@media (min-width:1920px)': {
        display: 'block',
        margin: 8,
      },
    },
    icon: {
      fill: 'currentColor',
      filter: 'drop-shadow( 1px 1px 1px rgba(0, 0, 0, .5))',
      height: '100%',
      userSelect: 'none',
      width: '100%',
    },
    headline: {
      color: 'white',
      fontSize: 72,
      lineHeight: 1,
      margin: 0,
      textDecoration: 'underline',
      textDecorationColor: '#69c',
    },
    headlineCheat: {
      position: 'absolute',
      textDecoration: 'none',
      textShadow: '1px 1px 1px rgba(128, 128, 128, 0.5)',
      top: 20,
    },
    heroSubTextContainer: {
      fontSize: 20,
      paddingTop: 15,
    },
    heroLink: {
      color: 'white',
      display: 'block',
      textDecoration: 'none',
    },
    itemContainer: {
      alignItems: 'center',
      display: 'flex',
      margin: '0 -15px',
      '@media (max-width:568px)': {
        display: 'block',
      }
    },
    itemWrapper: {
      flex: 1,
      margin: 15,
      position: 'relative',
    },
    item: {
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'block',
      height: 500,
      opacity: .5,
      transition: 'opacity .2s ease-in-out',
      '&:hover': {
        opacity: .8,
      },
      '@media (max-width:568px)': {
        height: 240,
      }
    },
    projects: {
      backgroundImage: `url(${createOptimizedSrc(ASSET_DOMAIN + '/projects/moovweb-geico-01.jpg?2021051900', { quality: 80 })})`,
      backgroundPosition: '2% 72%',
      '@media (max-width:568px)': {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    },
    photos: {
      backgroundImage: `url(${createOptimizedSrc(ASSET_DOMAIN + '/concerts/0135%2026.jpg?2021051900', { quality: 80 })})`,
      backgroundPosition: 'center 75%',
      '@media (max-width:568px)': {
        backgroundPosition: 'center 60%',
      }
    },
    keyboards: {
      backgroundImage: `url(${createOptimizedSrc(ASSET_DOMAIN + '/keyboards/ai03-polaris.jpg?2021052000', { quality: 80 })})`,
    },
    itemText: {
      background: 'rgba(102, 153, 204, .75)',
      color: 'white',
      display: 'inline-block',
      fontWeight: 'bold',
      left: '50%',
      minWidth: 120,
      padding: 10,
      pointerEvents: 'none',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }
  })
)
@withAmp
@inject(({ app }) => ({ app, social: app.social }))
@observer
export default class Home extends Component {
  renderIconRow(val) {
    const { classes, social } = this.props
    return (
      <div className={classnames(classes.iconRow, val)}>
        <div className={classes.line}>
          <LinkBlank to={social.twitch} className={classes.iconWrapper}>
            <Twitch className={classes.icon} />
          </LinkBlank>
          <LinkBlank to={social.instagram} className={classes.iconWrapper}>
            <Instagram className={classes.icon} />
          </LinkBlank>
          <LinkBlank to={social.youtubeV} className={classes.iconWrapper}>
            <YouTube className={classes.icon} />
          </LinkBlank>
        </div>
        <div className={classes.line}>
          <LinkBlank to={social.github} className={classes.iconWrapper}>
            <GitHub className={classes.icon} />
          </LinkBlank>
          <LinkBlank to={social.discordS} className={classes.iconWrapper}>
            <Discord className={classes.icon} />
          </LinkBlank>
          <LinkBlank to={social.twitter} className={classes.iconWrapper}>
            <Twitter className={classes.icon} />
          </LinkBlank>
        </div>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.heroContainer}>
          <div className={classes.heroTextContainer}>
            <h1 className={classes.headline}>cgbuen</h1>
            <div className={classnames(classes.headline, classes.headlineCheat)}>cgbuen</div>
            <div className={classes.heroSubTextContainer}>
              <Link to="/projects" className={classes.heroLink}>Software Engineering.</Link>
              <Link to="/photography" className={classes.heroLink}>Concert Photography.</Link>
              <Link to="/collection" className={classes.heroLink}>Keyboard Collecting.</Link>
            </div>
            {this.renderIconRow(classes.heroBox)}
          </div>
          {this.renderIconRow(classes.asdfg)}
        </div>
        <Container>
          <Row className={classes.itemContainer}>
            <div className={classes.itemWrapper}>
              <Link to="/projects" className={classnames(classes.item, classes.projects)}></Link>
              <div className={classes.itemText}>Projects</div>
            </div>
            <div className={classes.itemWrapper}>
              <Link to="/photography" className={classnames(classes.item, classes.photos)}></Link>
              <div className={classes.itemText}>Photos</div>
            </div>
            <div className={classes.itemWrapper}>
              <Link to="/collection" className={classnames(classes.item, classes.keyboards)}></Link>
              <div className={classes.itemText}>Keyboards</div>
            </div>
          </Row>
          <Row>
          </Row>
        </Container>
      </div>
    )
  }
}
