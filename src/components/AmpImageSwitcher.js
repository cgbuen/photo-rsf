/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import classnames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Video from 'react-storefront/Video'

export const styles = theme => ({
  root: {
    height: 500,
    width: '100%',
    position: 'relative',
    '& > *': {
      paddingBottom:0 
    },
    '& *[role=button]': {
      borderRadius: '50%',
      opacity: '0.5',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  },

  // This fixes the issue where images do not show up sometimes when amp-carousel is placed in
  // a div with display: flex.  See https://github.com/ampproject/amphtml/issues/14519
  rootImportant: {
    '&$root': {
      display: 'block'
    }
  },

  carouselWrap: {
    height: 'calc(100% - 65px)',
    position: 'relative'
  },

  thumbnails: {
    marginTop: '10px',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'stretch',
    maxWidth: '100%',
    overflowX: 'auto',
    overflowY: 'hidden'
  },

  thumbnailsWrap: {
    justifyContent: 'center',
    margin: 'auto',
    height: 70,
    width: '100%',
    position: 'relative',
    // Since the thumbnails are dynamically fetched, we are letting
    // the wrapper fill the space and centering the thumbnails
    // with a inner AMP component
    '& amp-list div[role=list]': {
      display: 'flex',
      justifyContent: 'center'
    }
  },

  thumbnail: {
    height: 50,
    width: 50,
    position: 'relative',
    margin: '0 2px',
    border: 'none',
    outline: 'none',
    background: 'none',
    opacity: 0.7,
    '& img': {
      objectFit: 'cover'
    }
  },

  thumbnailSelected: {
    opacity: 1
  },

  thumbnailSelectedLine: {
    borderBottom: '3px solid #69c',
    position: 'absolute',
    bottom: -10,
    left: 0,
    width: '50px'
  },

  dot: {},
  dots: {},
  dotSelected: {},

  hidden: {
    display: 'none'
  },

  '@global': {
    'amp-lightbox-gallery div[aria-label="Gallery"]': {
      display: 'none'
    }
  }
})

/**
 * An AMP-compatible image switcher with pinch and zoom.
 */
@withStyles(styles, { name: 'RSFAmpImageSwitcher' })
@inject('nextId', 'ampStateId', 'app')
export default class AmpImageSwitcher extends Component {
  static propTypes = {
    /**
     * The amp-carousel type.  Can be "slides" or "carousel".  Defaults to "slides".
     */
    type: PropTypes.oneOf(['slides', 'carousel']),

    /**
     * Set to true to display dots indicated which image in the series is selected.  Defaults to false
     */
    indicators: PropTypes.bool,

    /**
     * The property in the amp state to bind to.  Defaults to "selectedImage"
     */
    ampStateProperty: PropTypes.string,

    /**
     * Set to true to display left and right arrows.  Defaults to false
     */
    arrows: PropTypes.bool
  }

  static defaultProps = {
    type: 'slides',
    indicators: false,
    ampStateProperty: 'selectedImage',
    arrows: false
  }

  constructor({ id, nextId }) {
    super()
    id = id || nextId()
    this.id = id || `moov-image-switcher-${id}`
    this.ampStateId = `moovImageSwitcherState${id}`
  }

  render() {
    let {
      type,
      arrows,
      ampStateId,
      ampStateProperty,
      images,
      thumbnails,
      classes,
      className,
    } = this.props

    const { id } = this

    // This endpoint is only used to give AMP a valid initial `src` for AMP lists

    const Carousel = ({ children, ...props }) => (
      <amp-carousel
        controls={arrows ? true : undefined}
        id={id}
        lightbox
        layout="fill"
        type={type}
        loop
        amp-bind={`slide=> ${ampStateId}.${ampStateProperty}`}
        on={`slideChange:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: event.index } })`}
        {...props}
      >
        {children}
      </amp-carousel>
    )

    const Thumbnail = ({ src, alt, index }) => (
      <button
        key={src}
        type="button"
        on={`tap:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: ${index} }})`}
        className={classnames(classes.thumbnail, {
          [classes.thumbnailSelected]: (index === 0) || undefined
        })}
        amp-bind={`class=>${ampStateId}.${ampStateProperty} == ${index} ? '${classes.thumbnail} ${
          classes.thumbnailSelected
        }' : '${classes.thumbnail}'`}
      >
        <amp-img layout="fill" src={src} alt={alt} />
        <div
          className={(index === 0 && classes.thumbnailSelectedLine) || undefined}
          amp-bind={`class=>${ampStateId}.${ampStateProperty} == ${index} ? '${
            classes.thumbnailSelectedLine
          }' : ''`}
        />
      </button>
    )

    return (
      <div className={classnames(className, classes.root, classes.rootImportant)}>
        <Helmet>
          <script
            async
            custom-element="amp-list"
            src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
          />
          <script
            async
            custom-template="amp-mustache"
            src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
          />
          <script
            async
            custom-element="amp-carousel"
            src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
          />
          <script
            async
            custom-element="amp-lightbox-gallery"
            src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"
          />
        </Helmet>
        <amp-state
          id={ampStateId}
        />
        <div className={classes.carouselWrap}>
          <Carousel>
            {images.map(({ src, alt, video, roll, number }) =>
              video ? (
                <Video src={src} alt={alt} key={src} />
              ) : (
                  <amp-img key={src} src={src} layout="fill" alt={alt} aria-describedby={`photo-${roll}-${number}`} />
              )
            )}
          </Carousel>
          {images.map(({ roll, number, subject, film, venue, city, date }) =>
            <div id={`photo-${roll}-${number}`} className={classes.hidden}>
              {subject}, {film}{"\n"}
              {venue}, {city}{"\n"}
              {date}
            </div>
          )}
        </div>
        <div className={classes.thumbnails}>
          <div className={classes.thumbnailsWrap}>
            {thumbnails.map(({ src, alt }, index) => (
              <Thumbnail key={index} src={src} alt={alt} index={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
