import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import LinkBlank from '../components/LinkBlank'
import { createOptimizedSrc } from 'react-storefront/imageService'
import Card from '../components/Card'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@withStyles(
  theme => ({
    linkContainer: {
      textDecoration: 'none',
    },
    cardTitle: {
      color: 'white',
    },
    text: {
      color: 'white',
      fontWeight: 'normal',
    },
    fakeLink: {
      color: '#69c',
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  })
)
@inject(({ app }) => ({ app, social: app.social }))
@observer
export default class Commissions extends Component {
  render() {
    const { classes, app, social } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Commissions</Typography>
        </Row>
        <Row>
          <p>
            A few things you can commission me for.
          </p>
          <Card
            classes={{ cardTitle: classes.cardTitle }}
            name="Shoots"
            src={createOptimizedSrc("https://ph-1080.cgbuen.com/resources/shoots.jpg", { quality: app.config.imageQualityAmp, width: 570 })}
            description={(
              <div className={classes.text}>
                Send me a message on Discord ({social.discordP}) or {" "}
                <LinkBlank to={social.instagram}>Instagram</LinkBlank>, or by {" "}
                <LinkBlank to={`mailto:${social.email}`}>email</LinkBlank>.
              </div>
            )}
          />
          <LinkBlank className={classes.linkContainer} to="https://forms.gle/tefHXyEh9WsAJjBs9">
            <Card
              classes={{ cardTitle: classes.cardTitle }}
              name="Film Development & Scanning"
              src={createOptimizedSrc("https://ph-1080.cgbuen.com/resources/film.jpg", { quality: app.config.imageQualityAmp, width: 570 })}
              description={(
                <div className={classes.text}>
                  I'll develop and scan your photo film, ready for print or social media, starting at $3 per roll.{" "}
                  For the fastest response, fill out <span className={classes.fakeLink}>this form</span>.
                </div>
              )}
            />
          </LinkBlank>
          <Card
            classes={{ cardTitle: classes.cardTitle }}
            name="Keyboard Builds"
            src={createOptimizedSrc("https://ph-1080.cgbuen.com/resources/keyboards.jpg", { quality: app.config.imageQualityAmp, width: 570 })}
            description={(
              <div className={classes.text}>
                Send me a message on Discord ({social.discordP}),{" "}
                <LinkBlank to={social.instagram}>Instagram</LinkBlank>, or {" "}
                <LinkBlank to={`mailto:${social.email}`}>email</LinkBlank>.
              </div>
            )}
          />
        </Row>
      </Container>
    )
  }
}
