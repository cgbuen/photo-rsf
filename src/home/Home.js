import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'

@withStyles(
  theme => ({
    hero: {
      width: '100%'
    },
  })
)
@withAmp
@inject(({ app }) => ({ app }))
@observer
export default class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <img className={classes.hero} alt="" src="https://via.placeholder.com/450x150" />
        <Container>
          <Row>
            <Typography variant="h1">Home</Typography>
          </Row>
          <Row>
            <div>asdf</div>
          </Row>
        </Container>
      </div>
    )
  }
}
