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
import CompareArrows from '@material-ui/icons/CompareArrows'
import Redo from '@material-ui/icons/Redo'
import IconButton from '@material-ui/core/IconButton'
import { fade } from '@material-ui/core/styles/colorManipulator'
import classnames from 'classnames'
import TabsRow from './TabsRow'
import analytics from 'react-storefront/analytics'
import { inject, observer } from 'mobx-react'
import AmpImageSwitcher from './AmpImageSwitcher'
import LoadMask from 'react-storefront/LoadMask'
import Image from 'react-storefront/Image'
import Video from 'react-storefront/Video'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import { createOptimizedSrc } from 'react-storefront/imageService'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const paletteIconTextColor = '#77726D'

const mediaPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  video: PropTypes.bool,
  subject: PropTypes.string.isRequired,
  film: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  descriptionVisible: PropTypes.bool,
})

export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '& img': {
      display: 'block'
    }
  },
  rootViewerActive: {
    display: 'none'
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

  arrows: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
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

  viewerToggle: {
    transform: 'scale(0.4)',
    position: 'absolute',
    top: 0,
    right: 0,
    background: fade(theme.palette.text.icon || paletteIconTextColor, 0.4),
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    transitionDuration: '0.5s',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'
  },

  viewerActive: {
    transform: 'scale(0.4) rotateZ(45deg)'
  },

  viewerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.background.paper,
    zIndex: 9999,
    transitionDuration: '0.5s',
    transform: 'translateY(100%)',
    visibility: 'hidden', // prevents lightbox from showing near the bottom of screen when browser controls hide on ios
    '& img': {
      margin: 'auto',
      maxHeight: '100%',
      maxWidth: '100%'
    },
    // Hack to fix root div height of pan/zoom/pinch container
    '& > div:first-child': {
      height: '100%'
    }
  },

  viewerOverlayActive: {
    transform: 'translateY(0%)',
    visibility: 'visible'
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

  playButton: {
    '&:after': {
      color: 'white',
      content: '"►"',
      position: 'absolute',
      left: 'calc(50% - 24px)',
      top: 'calc(50% - 24px)',
      fontSize: '48px'
    }
  },

  playing: {
    '&:after': {
      display: 'none'
    }
  },

  zoomIcon: {
    fill: 'white'
  },

  closeIcon: {
    stroke: 'white'
  },

  description: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    textAlign: 'center'
  },

  descriptionInner: {
    background: 'rgba(21, 21, 21, .85)',
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

  anchorOriginCenter: {
    bottom: 'auto',
    display: 'inline-block',
    left: '50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  snackbarContentRoot: {
    background: 'rgba(34, 34, 34, .85)',
    borderRadius: 5,
    boxShadow: '0 0 3px rgba(64, 64, 64, .3)',
    color: 'white',
    display: 'inline-block',
    minWidth: 0,
    whiteSpace: 'nowrap',
  },

  pinchIcon: {
    transform: 'rotate(-45deg)',
    verticalAlign: 'middle'
  },

  slideIcon: {
    verticalAlign: 'middle'
  },

  itemWrapper: {
    display: 'flex',
    width: '100%'
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
  }
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
     */
    images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, mediaPropType])).isRequired,

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
     * Props to apply to the Image component used to display the product thumbnail while
     * the product data is loading
     */
    loadingThumbnailProps: PropTypes.object,

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
    reactPinchZoomPanOptions: PropTypes.shape({
      onPinchStart: PropTypes.func,
      onPinchStop: PropTypes.func,
      initialScale: PropTypes.number,
      maxScale: PropTypes.number
    }),

    /**
     * Set to true to always revert back to the first image when image URLs
     * are changed.  This behavior is automatically adopted when the `product`
     * prop is specified.
     */
    resetSelectionWhenImagesChange: PropTypes.bool
  }

  static defaultProps = {
    images: [],
    arrows: true,
    indicators: false,
    loadingThumbnailProps: {},
    imageProps: {},
    reactPinchZoomPanOptions: {
      maxScale: 3
    }
  }

  state = {
    fullSizeImagesLoaded: true,
    viewerActive: false,
    playingVideo: false,
    shownSnackbar: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      images: normalizeImages(nextProps, 'images'),
      selectedIndex:
        nextProps.selectedIndex != null ? nextProps.selectedIndex : prevState.selectedIndex || 0
    }

    if (!prevState.images) {
      // new images are loading in, show the loadingProduct.thumbnail
      nextState.fullSizeImagesLoaded = false

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
    if (event.keyCode === 27 && this.state.viewerActive) {
      this.setState({ viewerActive: false })
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

  renderDot(index) {
    const classes = classnames(this.props.classes.dot, {
      [this.props.classes.dotSelected]: index === this.state.selectedIndex
    })
    return <div key={index} className={classes} />
  }

  renderThumbnails({ inPortal=false }={}) {
    const { classes, thumbnailsTitle, notFoundSrc, thumbnailImageProps } = this.props
    const thumbnails = this.state.images
    const modifiedThumbs = thumbnails && thumbnails.map(({ src, alt }) => ({ imageUrl: createOptimizedSrc(src, { quality: 35 }), alt }))
    const { selectedIndex } = this.state

    return (
      thumbnails &&
      thumbnails.length > 0 && (
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
            initialSelectedIdx={selectedIndex}
            onTabChange={(e, selectedIndex) =>
              this.setState({ selectedIndex, playingVideo: false })
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

  renderSnackbar() {
    const { classes } = this.props
    const handleClose = e => {
      this.setState({ shownSnackbar: true })
    }
    return (
      <Snackbar
        classes={{
          anchorOriginTopCenter: classes.anchorOriginCenter
        }}
        ContentProps={{
          classes: {
            root: classes.snackbarContentRoot
          }
        }}
        open={!this.state.shownSnackbar}
        onClose={handleClose.bind(this)}
        message={
          <div>
            <div>
              <CompareArrows className={classes.pinchIcon} /> <span>Pinch to zoom, then</span>
            </div>
            <div>
              <Redo className={classes.slideIcon} /> <span>Touch and slide to pan</span>
            </div>
          </div>
        }
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={2250}
        TransitionComponent={Fade}
      />
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState &&
      prevState.selectedIndex &&
      prevState.selectedIndex !== this.state.selectedIndex &&
      this.props.product
    ) {
      analytics.fire('imageSwitched', {
        product: this.props.product,
        imageUrl: this.props.images[this.state.selectedIndex]
      })
    }
  }

  render() {
    let {
      app,
      product,
      classes,
      className,
      arrows,
      indicators,
      style,
      loadingThumbnailProps,
      imageProps,
      notFoundSrc,
      id,
      images
    } = this.props

    const { fullSizeImagesLoaded } = this.state

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
            index={selectedIndex}
            onChangeIndex={i => this.setState({ selectedIndex: i })}
          >
            {images.map((photo, i) => (
              <div key={i} className={classes.imageWrap}>
                {photo.video ? (
                  <Video src={photo.src} alt={photo.alt} />
                ) : (
                  <div className={classes.itemWrapper}>
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
                      onClick={() => photo.toggleDescription()}
                      notFoundSrc={notFoundSrc}
                      src={photo.src}
                      alt={photo.alt}
                      onLoad={i === 0 ? this.onFullSizeImagesLoaded : null}
                      {...imageProps}
                    />
                  </div>
                )}
                {this.renderDescription(photo)}
              </div>
            ))}
          </SwipeableViews>

          {arrows && (
            <div className={classes.arrows}>
              {selectedIndex !== 0 && (
                <IconButton
                  className={classnames(classes.arrow, classes.leftArrow)}
                  onClick={() => this.setState({ selectedIndex: selectedIndex - 1 })}
                >
                  <ChevronLeft classes={{ root: classes.icon }} />
                </IconButton>
              )}
              {selectedIndex !== images.length - 1 && (
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

          {product && <LoadMask show={product.loadingImages} className={classes.mask} />}

          {product &&
            app.loadingProduct &&
            app.loadingProduct.thumbnail &&
            !fullSizeImagesLoaded && (
              <Image
                src={app.loadingProduct.thumbnail}
                className={classes.productThumb}
                {...loadingThumbnailProps}
                fill
              />
            )}
        </div>

        {this.renderThumbnails()}
      </div>
    )
  }

  onFullSizeImagesLoaded = () => {
    this.setState({ fullSizeImagesLoaded: true })
    this.props.app.applyState({ loadingProduct: null })
  }
}

/**
 * Converts an array that can contain strings or MediaTypeModel instances into
 * an array of objects with src, alt, and video
 * @private
 * @param {Object} props
 * @param {String} key "images" or "thumbnails"
 */
function normalizeImages(props, key) {
  const { product } = props
  const productName = product && product.name
  let images = props[key]

  if (!images || !images.length) {
    images = product && product[key]
  }

  return !images
    ? []
    : images.map(e => {
        if (typeof e === 'string') {
          return { src: e, alt: productName, video: false }
        } else {
          return { ...e, alt: e.alt || productName }
        }
      })
}
