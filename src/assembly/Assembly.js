import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import Card from '../components/Card'

@withAmp
@inject(({ app }) => ({ app, builds: app.builds }))
@observer
export default class Assembly extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  render() {
    const { builds } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Builds</Typography>
        </Row>
        {builds.map(x => (
          <Card
            key={x.id}
            name={x.name}
            src={x.src}
            description={x.description}
          />
        ))}
      </Container>
    )
  }
}
