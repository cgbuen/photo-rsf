import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import ImageSwitcher from '../components/ImageSwitcher'
import Typography from '@material-ui/core/Typography'
import photos from '../photos'

const activePhotos = photos
  .filter(photo => photo.active)
  .reverse()
  .map(photo => {
    photo.src = `https://s3-us-west-1.amazonaws.com/ph-1080.cgbuen.com/${photo.roll}+${photo.number}.jpg`
    return photo
  })
@withStyles(
  theme => ({
    headline: {
      fontSize: 36,
      lineHeight: 1
    },
    imageSwitcher: {
      marginBottom: 40,
      [theme.breakpoints.down('sm')]: {
        height: 500
      }
    },
    viewerToggle: {
      background: 'rgba(128, 128, 128, .5)',
      boxShadow: '0 0 1px rgba(64, 64, 64, .5)',
      height: 'auto',
      padding: 10,
      right: 10,
      top: 10,
      transform: 'none',
      width: 'auto',
      zIndex: 1,
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
@observer
export default class Home extends Component {
  render() {
    const { classes } = this.props

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
            images={activePhotos}
            imageProps={{
              aspectRatio: 50,
              quality: 50,
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
