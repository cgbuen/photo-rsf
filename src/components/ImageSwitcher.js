/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import withStyles from '@material-ui/core/styles/withStyles'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Person from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'
import { fade } from '@material-ui/core/styles/colorManipulator'
import classnames from 'classnames'
import TabsRow from './TabsRow'
import analytics from 'react-storefront/analytics'
import { inject, observer } from 'mobx-react'
import AmpImageSwitcher from './AmpImageSwitcher'
import Image from 'react-storefront/Image'
import Typography from '@material-ui/core/Typography'
import { createOptimizedSrc } from 'react-storefront/imageService'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function mod(n, m) {
  const q = n % m
  return q < 0 ? q + m : q
}

export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '& img': {
      display: 'block'
    }
  },

  swipeWrap: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    '& .react-swipeable-view-container, & > div:first-child': {
      height: '100%'
    }
  },

  imageWrap: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain'
    }
  },

  thumbsTitle: {
    textTransform: 'uppercase'
  },

  productThumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  thumbs: {
    marginTop: `${theme.margins.container}px`
  },

  thumbnail: {
    paddingBottom: '8px',
    margin: '0 2px',
    boxSizing: 'content-box',
    height: '50px',
    width: '50px'
  },

  activeThumbs: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: '10px 0 20px',
  },

  selected: {
    borderColor: '#D0D0D0'
  },

  arrow: {
    padding: 7,
    position: 'absolute',
    top: '50%',
    marginTop: '-24px',
    '&, &:hover': {
      background: 'rgba(17, 17, 17, .5)',
      boxShadow: '0 0 2px 2px rgba(64, 64, 64, .3)',
    },
  },

  leftArrow: {
    left: 25
  },

  rightArrow: {
    right: 25
  },

  icon: {
    height: '30px',
    width: '30px'
  },

  iconPerson: {
    fill: 'white',
    position: 'absolute',
    left: 20,
    bottom: 20,
    background: 'rgba(17, 17, 17, .65)',
    borderRadius: '50%',
    padding: 5,
    width: 30,
    height: 30,
  },

  dot: {
    backgroundColor: fade(theme.palette.text.primary, 0.25),
    width: 8,
    height: 8,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.background.paper,
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 2px',
    // Same duration as SwipeableViews animation
    transitionDuration: '0.35s'
  },

  dotSelected: {
    backgroundColor: theme.palette.text.primary
  },

  dots: {
    position: 'absolute',
    bottom: '5px',
    textAlign: 'center',
    width: '100%'
  },

  tabsRowRoot: {
    boxShadow: 'none'
  },

  tabScroller: {
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${theme.margins.container}px`
    }
  },

  indicator: {
    height: 3
  },

  mask: {
    opacity: '0.8'
  },

  description: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    textAlign: 'center'
  },

  descriptionInner: {
    background: 'rgba(17, 17, 17, .85)',
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 5,
    opacity: 0,
    transition: 'opacity .3s ease-in-out',
  },

  descriptionVisible: {
    opacity: 1,
  },

  descriptionLine: {
    fontSize: 16,
    lineHeight: 1.2,
    textAlign: 'center',
  },

  itemWrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    '& img': {
      userDrag: 'none',
    },
  },

  itemForeground: {
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },

  itemBackground: {
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },

  itemBackgroundImage: {
    height: '100%',
    '& img': {
      height: '120%',
      left: '50%',
      maxHeight: '120%',
      maxWidth: '120%',
      objectFit: 'cover !important',
      opacity: .5,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120%',
    }
  },

  backdropFilter: {
    backdropFilter: 'blur(5px)',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1
  },

  viewerOverlay: {
  },
  viewerToggle: {
  },
  viewerActive: {
  },
})

/**
 * A swipeable image selector suitable for PDPs
 */
@withStyles(styles, { name: 'RSFImageSwitcher' })
@inject('app')
@observer
export default class ImageSwitcher extends Component {
  static propTypes = {
    /**
     * If specified, then the image_switched analytics event will be
     * fired when an image is selected and the product's images and thumbnails will
     * automatically be displayed.
     */
    product: PropTypes.object,

    /**
     * An array of (URL or image object) for the full size images
     * Generalized to object with mediaPropTypes removed since actual (not
     * observable) array breaks here, which is needed from mobx for state, and
     * since mobx PropTypes did not work immediately.
     */
    images: PropTypes.object.isRequired,

    /**
     * Display left/right arrows for navigating through images
     */
    arrows: PropTypes.bool,

    /**
     * Display indicator dots at the bottom of the component
     */
    indicators: PropTypes.bool,

    /**
     * Optional title for thumbnails block
     */
    thumbnailsTitle: PropTypes.string,

    /**
     * Props to apply to the thumbnail images
     */
    thumbnailImageProps: PropTypes.object,

    /**
     * Props to be added to the Image child components.
     */
    imageProps: PropTypes.object,

    /*
     * Option to manually set the selected index
     */
    selectedIndex: PropTypes.number,

    /**
     * The URL of image to load if an image fails to load
     */
    notFoundSrc: PropTypes.string,

    /**
     * Config options for the image viewer
     */
    /**
     * Set to true to always revert back to the first image when image URLs
     * are changed.  This behavior is automatically adopted when the `product`
     * prop is specified.
     */
    resetSelectionWhenImagesChange: PropTypes.bool,

    /**
     * If true, scrolling past the last slide will cycle back to the first
     */
    infinite: PropTypes.bool,
  }

  static defaultProps = {
    images: [],
    arrows: true,
    indicators: false,
    imageProps: {},
    infinite: false,
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const images = nextProps.images
    const nextState = {
      images,
      selectedIndex: nextProps.selectedIndex != null ? nextProps.selectedIndex : prevState.selectedIndex || 0,
      maxIndex: Math.ceil(images.length)
    }

    if (!prevState.images) {
      // reset the selected index to the first image
      if (!nextProps.selectedIndex) {
        nextState.selectedIndex = 0
      }

      return nextState
    } else if (prevState.selectedIndex == null) {
      return nextState
    } else {
      return null
    }
  }
  constructor(props) {
    super(props)
    this.escFunction = this.escFunction.bind(this);
  }
  escFunction(event) {
    if (event.keyCode === 27) {
      const { images } = this.props
      const { selectedIndex } = this.state
      if (images[selectedIndex].descriptionVisible) {
        this.props.images[this.state.selectedIndex].toggleDescription()
      }
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
    if (this.disposeReaction) {
      this.disposeReaction()
    }
  }

  getSelectedIndex = () => {
    const { selectedIndex, maxIndex } = this.state
    return mod(selectedIndex, maxIndex)
  }

  renderDot(index) {
    const classes = classnames(this.props.classes.dot, {
      [this.props.classes.dotSelected]: index === this.getSelectedIndex()
    })
    return <div key={index} className={classes} />
  }

  renderThumbnails({ inPortal=false }={}) {
    const { classes, thumbnailsTitle, notFoundSrc, thumbnailImageProps, images } = this.props
    const modifiedThumbs = images && images.map(({ src, alt }) => ({ imageUrl: createOptimizedSrc(src, { quality: 35 }), alt, width: 50, height: 50 }))

    return (
      images &&
      images.length > 0 && (
        <div className={classnames(classes.thumbs, { [classes.activeThumbs]: inPortal })}>
          <div className="field">
            <label className={classes.thumbsTitle}>{thumbnailsTitle}</label>
          </div>
          <TabsRow
            classes={{
              indicator: classes.indicator,
              scroller: classes.tabScroller,
              root: classes.tabsRowRoot
            }}
            imageProps={{
              className: classes.thumbnail,
              notFoundSrc,
              fill: true,
              ...thumbnailImageProps
            }}
            centered
            initialSelectedIdx={this.getSelectedIndex()}
            onTabChange={(e, selectedIndex) =>
              this.setState({ selectedIndex })
            }
            items={modifiedThumbs}
          />
        </div>
      )
    )
  }

  renderDescription(photo={}) {
    const { classes } = this.props
    return (
      <div className={classes.description}>
        <div className={classnames({
          [classes.descriptionInner]: true,
          [classes.descriptionVisible]: photo.descriptionVisible,
        })}>
          <Typography className={classes.descriptionLine} variant="subtitle1">
            {photo.subject}{(photo.venue && photo.venue.includes('n/a')) ? '' : ` @ ${photo.venue}`}
          </Typography>
          <Typography className={classes.descriptionLine} variant="subtitle1">
            {photo.city === 'Coachella' ? `${photo.city} ${photo.date.substring(0, 4)}` : `${photo.city}, ${MONTHS[parseInt(photo.date.substring(5, 7)) - 1]} ${photo.date.substring(0, 4)}`}
          </Typography>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState &&
      prevState.selectedIndex &&
      prevState.selectedIndex !== this.state.selectedIndex
    ) {
      analytics.fire('imageSwitched', {
        product: { id: '0' },
        imageUrl: this.props.images[this.state.selectedIndex].src
      })
    }
  }

  renderSlide = (photo, i) => {
    const { notFoundSrc, imageProps, classes } = this.props
    return (
      <div key={i} className={classes.imageWrap}>
        <div className={classes.itemWrapper}>
          <div className={classes.itemForeground} onClick={() => photo.toggleDescription()} />
          <div className={classes.itemBackground}>
            <div className={classes.backdropFilter}></div>
            <Image
              key={photo.src}
              notFoundSrc={notFoundSrc}
              src={photo.src}
              alt={photo.alt}
              {...imageProps}
              classes={{
                root: classes.itemBackgroundImage
              }}
            />
          </div>
          <Image
            key={photo.src}
            notFoundSrc={notFoundSrc}
            src={photo.src}
            alt={photo.alt}
            {...imageProps}
          />
          <Person className={classes.iconPerson} />
        </div>
        {this.renderDescription(photo)}
      </div>
    )
  }

  render() {
    let {
      app,
      classes,
      className,
      arrows,
      indicators,
      style,
      id,
      images,
      infinite,
      enableMouseEvents,
    } = this.props

    if (app.amp) {
      const optImages = images.map(image => ({
        ...image,
        src: createOptimizedSrc(image.src, { quality: app.config.imageQualityAmp }),
      }))
      const thumbnails = images.map(image => ({
        ...image,
        src: createOptimizedSrc(image.src, { quality: app.config.imageQualityThumb }),
      }))
      return (
        <AmpImageSwitcher
          ampStateId={id}
          images={optImages}
          className={className}
          classes={{
            root: classes.root,
            dot: classes.dot,
            dots: classes.dots,
            dotSelected: classes.dotSelected,
            thumbnails: classes.thumbs
          }}
          arrows={arrows}
          indicators={indicators}
          thumbnails={thumbnails}
        />
      )
    }

    const { selectedIndex } = this.state

    return (
      <div
        className={classnames({
          [className]: true,
          [classes.root]: true,
        })}
        style={style}
      >
        {/* Full Size Images */}
        <div className={classes.swipeWrap}>
          <SwipeableViews
            index={this.getSelectedIndex()}
            onChangeIndex={i => this.setState({ selectedIndex: i})}
            enableMouseEvents={enableMouseEvents}
          >
            {images.map(this.renderSlide)}
          </SwipeableViews>

          {arrows && !enableMouseEvents && (
            <div className={classes.arrows}>
              {(selectedIndex !== 0 || infinite) && (
                <IconButton
                  className={classnames(classes.arrow, classes.leftArrow)}
                  onClick={() => this.setState({ selectedIndex: selectedIndex - 1 })}
                >
                  <ChevronLeft classes={{ root: classes.icon }} />
                </IconButton>
              )}
              {(selectedIndex !== images.length - 1 || infinite) && (
                <IconButton
                  className={classnames(classes.arrow, classes.rightArrow)}
                  onClick={() => this.setState({ selectedIndex: selectedIndex + 1 })}
                >
                  <ChevronRight classes={{ root: classes.icon }} />
                </IconButton>
              )}
            </div>
          )}

          {indicators && (
            <div className={classes.dots}>{images.map((_, index) => this.renderDot(index))}</div>
          )}

        </div>

        {this.renderThumbnails()}
      </div>
    )
  }
}
