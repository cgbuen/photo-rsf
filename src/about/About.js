import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Image from 'react-storefront/Image'
import Typography from '@material-ui/core/Typography'
import LinkBlank from '../components/LinkBlank'
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
            Hi! I'm Chris, a software engineer, photographer, and content
            creator based in San Francisco, California. This website serves as a
            portfolio of work completed both professionally and for leisure.
          </p>
          <p>
            I stream a few different types of content on <LinkBlank to={social.twitch}>Twitch</LinkBlank>,
            including:
          </p>
          <ul>
            <li>Custom mechanical keyboard builds</li>
            <li>Photo film shoots, development, and scans</li>
            <li>Personal software projects</li>
            <li>Splatoon gameplay</li>
          </ul>
          <p>
            (Past broadcasts can be found <LinkBlank to={social.youtubeV}>here</LinkBlank>.)
          </p>
          <p>
            Send me a message for any inquiries. I'm best reached by Discord
            ({social.discordP}), <LinkBlank to={social.instagram}>Instagram</LinkBlank>{" "}
            DM, or <LinkBlank to={`mailto:${social.email}`}>email</LinkBlank>.
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
