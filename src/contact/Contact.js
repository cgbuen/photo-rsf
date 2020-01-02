import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Link from 'react-storefront/Link'

@withStyles(
  theme => ({
  })
)
@inject(({ app }) => ({ contact: app.contact }))
@observer
export default class About extends Component {
  render() {
    const { contact } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Inquiries</Typography>
        </Row>
        <Row>
          <Typography>Send me a message for inquiries. Best reached by <Link server to={contact.email}>email</Link> or by <Link server to={contact.instagram}>Instagram</Link> DM.</Typography>
        </Row>
      </Container>
    )
  }
}
