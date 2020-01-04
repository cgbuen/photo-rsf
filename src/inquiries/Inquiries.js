import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Link from 'react-storefront/Link'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@withStyles(
  theme => ({
  })
)
@inject(({ app }) => ({ social: app.social }))
@observer
export default class Inquiries extends Component {
  render() {
    const { social } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Inquiries</Typography>
        </Row>
        <Row>
          <Typography>
            Send me a message for inquiries. Best reached by{" "}
            <Link server to={social.instagram}>Instagram</Link> DM or by{" "}
            <Link server to={`mailto:${social.email}`}>email</Link>.
          </Typography>
        </Row>
      </Container>
    )
  }
}
