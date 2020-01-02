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
@inject(({ app }) => ({ social: app.social }))
@observer
export default class About extends Component {
  render() {
    const { classes, social } = this.props
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
          <Typography>
            Christopher Buenaventura (Chris, cgbuen, cg) shoots film from the
            pit at live Bay Area events. He also works as a{" "}
            <Link server to={social.website}>software engineer</Link> in the
            daytime, and streams Splatoon on{" "}
            <Link server to={social.twitch}>Twitch</Link> on off nights.
          </Typography>
        </Row>
      </Container>
    )
  }
}
