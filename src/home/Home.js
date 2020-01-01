import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import ImageSwitcher from '../components/ImageSwitcher'
import { createOptimizedSrc } from 'react-storefront/imageService'
import photos from '../photos'

const activePhotos = photos.filter(photo => photo.active).reverse()
@withStyles(
  theme => ({
    headline: {
      fontSize: 36,
      lineHeight: 1
    },
    imageSwitcher: {
      [theme.breakpoints.down('sm')]: {
        height: 500
      }
    },
    viewerToggle: {
      background: 'rgba(128, 128, 128, .5)',
      boxShadow: '0 0 1px rgba(0, 0, 0, .5)',
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
          <ImageSwitcher
            classes={{
              root: classes.imageSwitcher,
              viewerToggle: classes.viewerToggle,
              viewerActive: classes.viewerActive,
            }}
            images={activePhotos.map(photo => `https://s3-us-west-1.amazonaws.com/ph-1080.cgbuen.com/${photo.roll}+${photo.number}.jpg`)}
            thumbnails={activePhotos.map(photo => createOptimizedSrc(
              `https://s3-us-west-1.amazonaws.com/ph-1080.cgbuen.com/${photo.roll}+${photo.number}.jpg`,
              { width: 50 }
            ))}
            descriptions={activePhotos}
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
