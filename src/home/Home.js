import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@inject(({ app }) => ({ app }))
@observer
export default class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Typography variant="h1">Home</Typography>
        </Row>
        <Row>
          <div>asdf</div>
        </Row>
      </Container>
    )
  }
}
