import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import Card from '../components/Card'
import { createOptimizedSrc } from 'react-storefront/imageService'

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
    const { app, projects } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Software & Design Projects</Typography>
        </Row>
        <p>By day I work as a software engineer and architect solving fun problems on the web.</p>
        {projects.map(x => (
          <Card
            key={x.id}
            name={x.name}
            src={createOptimizedSrc(x.src, { quality: app.config.imageQualityAmp })}
            description={x.description}
          />
        ))}
      </Container>
    )
  }
}
