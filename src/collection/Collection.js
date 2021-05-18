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
export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  descriptionize(x) {
    return (
      <div>
        <div>Purchased: {x.date_bought}</div>
        <div>Built: {x.date_built}</div>
        <div>Color: {x.color}</div>
        <div>PCB: {x.pcb.replace('[prop]', '(proprietary)')}</div>
        <div>Plate: {x.plate}</div>
        <div>Switches: {x.switches}</div>
        <div>Keycaps: {x.keycaps}</div>
        {x.notes && (<div>Notes: {x.notes}</div>)}
      </div>
    )
  }

  render() {
    const { builds } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Keyboard Collection</Typography>
        </Row>
        <p>As a hobby I collect, build, and modify custom / higher-end "mechanical" (computer) keyboards.</p>
        {builds
          .filter(x => x.build_status !== 'On the way' && x.assembly_variant.includes('A'))
          .reverse()
          .map(x => (
            <Card
              key={x.id}
              name={x.name}
              src={x.src}
              description={this.descriptionize(x)}
            />
          ))
        }
      </Container>
    )
  }
}
