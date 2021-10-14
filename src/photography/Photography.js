import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import ImageSwitcher from '../components/ImageSwitcher'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@withStyles(
  theme => ({
    imageSwitcher: {
      marginBottom: 40,
    },
    viewerToggle: {
      background: 'rgba(17, 17, 17, .5)',
      boxShadow: '0 0 2px 2px rgba(64, 64, 64, .3)',
      color: 'white',
      height: 'auto',
      padding: 10,
      right: 25,
      top: 25,
      transform: 'none',
      width: 'auto',
      zIndex: 1,
    },
    viewerActive: {
      borderRadius: '50%',
      right: 0,
      top: -40,
      transform: 'scale(0.4) rotateZ(45deg) translateX(75px)',
    },
    image: {
      width: '100%'
    },
    maxHeight: {
      maxHeight: 620
    },
  })
)
@inject(({ app }) => ({ app, photos: app.photos }))
@observer
export default class Photography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandscape: false,
      loaded: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions();
    this.setState({ loaded: true })
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ isLandscape: window.innerWidth > window.innerHeight })
  }

  render() {
    const { classes, app, photos } = this.props
    const { isLandscape, loaded } = this.state

    return (
      <Container>
        <Row>
          <Typography variant="h1">Concert Photography</Typography>
        </Row>
        <p>Here are a few live music events I'm lucky to have shot. Click anywhere on each image for more info.</p>
        <Row>
          <ImageSwitcher
            id="gallerySwitcher"
            classes={{
              root: classes.imageSwitcher,
              viewerToggle: classes.viewerToggle,
              viewerActive: classes.viewerActive,
            }}
            images={photos}
            imageProps={{
              aspectRatio: isLandscape ? 66.66 : 125,
              quality: app.config.imageQuality,
              classes: {
                root: classnames({
                  [classes.image]: true,
                  [classes.maxHeight]: !loaded
                }),
              }
            }}
          />
        </Row>
      </Container>
    )
  }
}
