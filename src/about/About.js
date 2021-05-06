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
          <p>
            Hey there! I'm Chris, a software engineer and content creator based
            in the San Francisco, California. This serves as a portfolio of
            works completed both professionally and for leisure.
          </p>
          <p>
            I stream a few different types of content on Twitch, including:
          </p>
          <ul>
            <li>Personal software projects</li>
            <li>Film photography shooting, development, and scanning</li>
            <li>Mechanical keyboard builds</li>
            <li>Splatoon 2 gameplay</li>
          </ul>
          <p>
            Send me a message for inquiries. Best reached by Discord
            ({social.discordP}), <Link server to={social.instagram}>Instagram</Link>{" "}
            DM, or <Link server to={`mailto:${social.email}`}>email</Link>.
          </p>
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
