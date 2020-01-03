import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import ImageSwitcher from '../components/ImageSwitcher'
import Typography from '@material-ui/core/Typography'

@withStyles(
  theme => ({
    headline: {
      fontSize: 36,
      lineHeight: 1
    },
    imageSwitcher: {
      marginBottom: 40,
    },
    viewerToggle: {
      background: 'rgba(224, 224, 224, .85)',
      boxShadow: '0 0 2px 2px rgba(64, 64, 64, .3)',
      color: '#222',
      height: 'auto',
      padding: 10,
      right: 25,
      top: 25,
      transform: 'none',
      width: 'auto',
      zIndex: 1,
      '@media (prefers-color-scheme: dark)': {
        background: 'rgba(17, 17, 17, .5)',
        color: 'white'
      },
    },
    viewerActive: {
      borderRadius: '50%',
      transform: 'scale(0.4) rotateZ(45deg) translateX(75px)',
    },
    image: {
      width: '100%'
    },
  })
)
@inject(({ app }) => ({ photos: app.photos }))
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isLandscape: true };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ isLandscape: window.innerWidth > window.innerHeight });
  }

  render() {
    const { classes, photos } = this.props
    const { isLandscape } = this.state

    return (
      <Container>
        <Row>
          <Typography variant="h1">Gallery</Typography>
        </Row>
        <Row>
          <ImageSwitcher
            classes={{
              root: classes.imageSwitcher,
              viewerToggle: classes.viewerToggle,
              viewerActive: classes.viewerActive,
            }}
            images={photos.toJSON()}
            imageProps={{
              aspectRatio: isLandscape ? 66.66 : 125,
              quality: 99,
              classes: {
                root: classes.image
              }
            }}
          />
        </Row>
      </Container>
    )
  }
}
