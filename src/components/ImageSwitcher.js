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
import Zoom from '@material-ui/icons/ZoomIn'
import CompareArrows from '@material-ui/icons/CompareArrows'
import Redo from '@material-ui/icons/Redo'
import IconButton from '@material-ui/core/IconButton'
import Portal from '@material-ui/core/Portal'
import { fade } from '@material-ui/core/styles/colorManipulator'
import classnames from 'classnames'
import { ReactPinchZoomPan } from 'react-pinch-zoom-pan'
import TabsRow from 'react-storefront/TabsRow'
import analytics from 'react-storefront/analytics'
import { inject, observer } from 'mobx-react'
import AmpImageSwitcher from 'react-storefront/amp/AmpImageSwitcher'
import LoadMask from 'react-storefront/LoadMask'
import Image from 'react-storefront/Image'
import Video from 'react-storefront/Video'
import isEqual from 'lodash/isEqual'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import Hidden from '@material-ui/core/Hidden'
import { createOptimizedSrc } from 'react-storefront/imageService'

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
      background: 'rgba(224, 224, 224, .85)',
      boxShadow: '0 0 2px 2px rgba(64, 64, 64, .3)',
    },
    '@media (prefers-color-scheme: dark)': {
      '&, &:hover': {
        background: 'rgba(17, 17, 17, .5)',
        boxShadow: '0 0 2px 2px rgba(64, 64, 64, .3)',
      }
    }
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
    marginBottom: '0 !important',
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${theme.margins.container}px`
    }
  },

  indicator: {
    display: 'none'
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
    fill: '#222',
    '@media (prefers-color-scheme: dark)': {
      fill: 'white'
    },
  },

  closeIcon: {
    stroke: '#222',
    '@media (prefers-color-scheme: dark)': {
      stroke: 'white'
    },
  },

  description: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    textAlign: 'center'
  },

  descriptionInner: {
    background: 'white',
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 5,
    '@media (prefers-color-scheme: dark)': {
      background: '#222'
    },
  },

  descriptionLine: {
    fontSize: 13,
    lineHeight: 1,
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
    background: 'rgba(224, 224, 224, .85)',
    borderRadius: 5,
    boxShadow: '0 0 3px rgba(64, 64, 64, .3)',
    color: 'black',
    display: 'inline-block',
    minWidth: 0,
    whiteSpace: 'nowrap',
    '@media (prefers-color-scheme: dark)': {
      background: 'rgba(34, 34, 34, .85)',
      color: 'white'
    },
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
      background: '#222',
      height: '120%',
      left: '50%',
      maxHeight: '120%',
      maxWidth: '120%',
      objectFit: 'none',
      opacity: .25,
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120%',
      '@media (prefers-color-scheme: dark)': {
        opacity: .5,
      }
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

    /*
     * Option to show thumbnails only when zoomed view is active
     */
    viewerThumbnailsOnly: PropTypes.bool,

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
    viewerThumbnailsOnly: false,
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

    if (!prevState.images || !isEqual(nextState.images, prevState.images)) {
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

  componentWillUnmount() {
    if (this.disposeReaction) {
      this.disposeReaction()
    }
  }

  renderViewerToggle() {
    const { classes } = this.props
    return (
      <div
        onClick={() => this.toggleViewer()}
        className={classnames(classes.viewerToggle, {
          [classes.viewerActive]: this.state.viewerActive
        })}
      >
      {this.state.viewerActive
        ?
          <svg className={classes.closeIcon} width="100" height="100" viewBox="0 0 100 100">
            <line x1="50" y1="25" x2="50" y2="75" strokeWidth="4" />
            <line x1="25" y1="50" x2="75" y2="50" strokeWidth="4" />
          </svg>
        :
          <Zoom className={classes.zoomIcon} />
      }
      </div>
    )
  }

  toggleViewer() {
    if (this.state.viewerActive) {
      document.body.classList.remove('moov-modal')
    } else {
      document.body.classList.add('moov-modal')
    }

    this.setState({ viewerActive: !this.state.viewerActive })
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
        <div className={classes.descriptionInner}>
          <Typography className={classes.descriptionLine} variant="subtitle1">
            {photo.subject}, {photo.film}
          </Typography>
          <Typography className={classes.descriptionLine} variant="subtitle1">
            {photo.venue}, {photo.city}
          </Typography>
          <Typography className={classes.descriptionLine} variant="subtitle1">
            {photo.date}
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
              <CompareArrows className={classes.pinchIcon} /> <span>Pinch to zoom</span>
            </div>
            <div>
              <Redo className={classes.slideIcon} /> <span>Touch and slide to pan while zoomed</span>
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
      reactPinchZoomPanOptions,
      loadingThumbnailProps,
      imageProps,
      viewerThumbnailsOnly,
      notFoundSrc
    } = this.props

    const { fullSizeImagesLoaded, images } = this.state

    if (app.amp) {
      return (
        <AmpImageSwitcher
          product={product}
          images={images}
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
          thumbnails={viewerThumbnailsOnly ? null : images}
        />
      )
    }

    const { selectedIndex, viewerActive } = this.state
    const selectedImage = images[selectedIndex]
    const SelectedImageTag = selectedImage.video ? 'video' : 'img'

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
            {images.map(({ src, alt, video }, i) => (
              <div key={i} className={classes.imageWrap}>
                {video ? (
                  <Video src={src} alt={alt} />
                ) : (
                  <div className={classes.itemWrapper}>
                    <div className={classes.itemBackground}>
                      <div className={classes.backdropFilter}></div>
                      <Image
                        key={src}
                        notFoundSrc={notFoundSrc}
                        src={src}
                        alt={alt}
                        {...imageProps}
                        classes={{
                          root: classes.itemBackgroundImage
                        }}
                      />
                    </div>
                    <Image
                      key={src}
                      notFoundSrc={notFoundSrc}
                      src={src}
                      alt={alt}
                      onLoad={i === 0 ? this.onFullSizeImagesLoaded : null}
                      {...imageProps}
                    />
                  </div>
                )}
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

          <Portal>
            <div
              className={classnames(classes.viewerOverlay, {
                [classes.viewerOverlayActive]: viewerActive
              })}
            >
              <ReactPinchZoomPan
                {...reactPinchZoomPanOptions}
                onPinchStart={() => this.setState({shownSnackbar: true})}
                render={obj => {
                  return (
                    <div
                      style={{
                        overflow: 'hidden',
                        position: 'relative',
                        height: '100%'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          height: '100%'
                        }}
                        className={classnames({
                          [classes.playButton]: selectedImage.video,
                          [classes.playing]: this.state.playingVideo
                        })}
                        onClick={() => {
                          if (this.selectedVideo) {
                            if (this.selectedVideo.paused) {
                              this.selectedVideo.play()
                              this.setState({ playingVideo: true })
                            } else {
                              this.selectedVideo.pause()
                              this.setState({ playingVideo: false })
                            }
                          }
                        }}
                      >
                        {selectedImage && (
                          <SelectedImageTag
                            ref={el => {
                              if (selectedImage.video) {
                                this.selectedVideo = el
                              }
                            }}
                            src={createOptimizedSrc(selectedImage.zoomSrc || selectedImage.src, { quality: 99 })}
                            alt={selectedImage.alt}
                            style={{
                              height: 'auto',
                              transform: `scale(${obj.scale}) translateY(${obj.y}px) translateX(${
                                obj.x
                              }px)`
                            }}
                          />
                        )}
                        {this.renderDescription(selectedImage)}
                      </div>
                    </div>
                  )
                }}
              />
              {viewerActive && this.renderViewerToggle()}
              <Hidden mdUp>
                {viewerActive && this.renderSnackbar()}
              </Hidden>
              {viewerActive && this.renderThumbnails({inPortal: true})}
            </div>
          </Portal>
          {!viewerActive && this.renderViewerToggle()}
        </div>

        {!viewerThumbnailsOnly && this.renderThumbnails()}
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
