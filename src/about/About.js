import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import Image from 'react-storefront/Image'
import Typography from '@material-ui/core/Typography'
import Link from 'react-storefront/Link'

@withStyles(
  theme => ({
  })
)
@inject(({ app }) => ({ about: app.about }))
@observer
export default class About extends Component {
  render() {
    const { about } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">About</Typography>
        </Row>
        <Row>
          <Image src={"https://placehold.it/300x300"} />
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
