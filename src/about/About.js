import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Image from 'react-storefront/Image'
import Typography from '@material-ui/core/Typography'
import Link from 'react-storefront/Link'
import { createOptimizedSrc } from 'react-storefront/imageService'

@withStyles(
  theme => ({
    bioPhoto: {
      width: '100%'
    }
  })
)
@inject(({ app }) => ({ about: app.about }))
@observer
export default class About extends Component {
  render() {
    const { classes, about } = this.props
    const bioPhoto = "https://s3-us-west-1.amazonaws.com/ph-1080.cgbuen.com/0245+04+bio.jpg?2020010102"

    return (
      <Container>
        <Row>
          <Typography variant="h1">About</Typography>
        </Row>
        <Row>
          <Image contain className={classes.bioPhoto} src={createOptimizedSrc(bioPhoto, {quality: 85})} />
        </Row>
        <Row>
          <Typography>{about.bio}</Typography>
        </Row>
        <Row>
          <Typography>Click <Link server to={about.link}>here</Link> for software-related work.</Typography>
        </Row>
      </Container>
    )
  }
}
