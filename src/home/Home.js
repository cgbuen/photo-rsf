import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import ImageSwitcher from '../components/ImageSwitcher'
import { createOptimizedSrc } from 'react-storefront/imageService'
import Hidden from '@material-ui/core/Hidden'
import photos from '../photos'

const activePhotos = photos.filter(photo => photo.active)
@withStyles(
  theme => ({
    imageSwitcher: {
      height: 500
    },
    link: {
      textDecoration: 'none'
    },
    image: {
      width: '100%'
    }
  })
)
@inject('app')
@observer
export default class Home extends Component {
  render() {
    const { app, classes } = this.props

    return (
      <Container>
        <Row>
          <ImageSwitcher
            classes={{
              root: classes.imageSwitcher
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
