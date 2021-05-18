import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import Link from 'react-storefront/Link'
import classnames from 'classnames'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'
@withStyles(
  theme => ({
    heroContainer: {
      background: `url(${ASSET_DOMAIN}/hero-1.jpg)`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: 918,
      position: 'relative',
      '@media (max-width:1080px)': {
        height: 689,
      }
    },
    heroImage: {
      width: '100%'
    },
    heroTextContainer: {
      borderRadius: 3,
      fontWeight: 'bold',
      left: '60%',
      lineHeight: 2,
      overflow: 'hidden',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-60%)',
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
      top: 0,
    },
    heroSubTextContainer: {
      background: 'rgba(128, 128, 128, .5)',
      borderRadius: '0 0 3px 3px',
      fontSize: 20,
      padding: 15,
    },
    itemContainer: {
      alignItems: 'center',
      display: 'flex',
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
      transition: 'opacity .2s linear',
      '&:hover': {
        opacity: .8,
      }
    },
    projects: {
      backgroundImage: `url(${ASSET_DOMAIN}/projects/moovweb-geico-01.jpg)`,
      backgroundPosition: '-21px 70%',
    },
    photos: {
      backgroundImage: `url(https://opt.moovweb.net/img?quality=90&img=https%3A%2F%2Fph-1080.cgbuen.com%2F0135%2B26.jpg%3F2020010600)`,
    },
    keyboards: {
      backgroundImage: `url(${ASSET_DOMAIN}/keyboards/ai03-polaris.jpg)`,
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
@inject(({ app }) => ({ app }))
@observer
export default class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.heroContainer}>
          <div className={classes.heroTextContainer}>
            <h1 className={classes.headline}>cgbuen</h1>
            <div className={classnames(classes.headline, classes.headlineCheat)}>cgbuen</div>
            <div className={classes.heroSubTextContainer}>
              <div>Software Engineering.</div>
              <div>Concert Photography.</div>
              <div>Content Creation.</div>
            </div>
          </div>
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
