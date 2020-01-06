import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Image from 'react-storefront/Image'
import Typography from '@material-ui/core/Typography'
import Link from 'react-storefront/Link'
import { createOptimizedSrc } from 'react-storefront/imageService'
import classnames from 'classnames'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@withStyles(
  theme => ({
    bioPhoto: {
      width: '100%'
    },
    ampBioPhoto: {
      height: 300
    }
  })
)
@inject(({ app }) => ({ app, social: app.social }))
@observer
export default class About extends Component {
  render() {
    const { classes, app, social } = this.props
    const bioPhoto = `${app.config.assetHost}/0245+04+bio.jpg?2020010102`

    return (
      <Container>
        <Row>
          <Typography variant="h1">About</Typography>
        </Row>
        <Row>
          <Typography>
            Christopher Buenaventura (Chris, cgbuen, cg) shoots film from the
            pit at live Bay Area events. He also works as a{" "}
            <Link server to={social.website}>software engineer</Link> in the
            daytime and streams Splatoon on{" "}
            <Link server to={social.twitch}>Twitch</Link> during off nights.
          </Typography>
        </Row>
        <Row>
          <Image
            contain
            className={classnames({
              [classes.bioPhoto]: true,
              [classes.ampBioPhoto]: app.amp
            })}
            src={createOptimizedSrc(bioPhoto, {quality: app.amp ? app.config.imageQualityAmp : app.config.imageQuality})}
          />
        </Row>
      </Container>
    )
  }
}
