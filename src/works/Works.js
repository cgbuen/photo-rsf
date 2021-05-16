import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import Card from '../components/Card'

@withAmp
@inject(({ app }) => ({ app, projects: app.projects }))
@observer
export default class Software extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  render() {
    const { projects } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Software & Design Works</Typography>
        </Row>
        <p>By day I work as a software engineer / architect, having had a modest background in design.</p>
        {projects.map(x => (
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
