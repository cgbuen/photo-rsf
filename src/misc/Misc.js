import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import LinkBlank from '../components/LinkBlank'
import Card from '../components/Card'
import { createOptimizedSrc } from 'react-storefront/imageService'

@withStyles(
  theme => ({
    linkContainer: {
      textDecoration: 'none',
    },
    cardTitle: {
      textDecoration: 'underline',
    },
    text: {
      color: 'white',
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, links: app.links }))
@observer
export default class Misc extends Component {
  descriptionize(x) {
    const { classes } = this.props
    return (
      <div className={classes.text}>
        {x.description !== 'N/A' ? x.description : ''}{" "}
        {x.author_link !== 'N/A' ? (
            <div>
              By <LinkBlank to={x.author_link}>{x.author_name}</LinkBlank>. Not by me.
            </div>
          )
          : ''
        }
      </div>
    )
  }

  render() {
    const { app, classes, links } = this.props
    return (
      <Container>
        <Row>
          <Typography variant="h1">Miscellaneous</Typography>
        </Row>
        <p>Links to other resources that don't fall under any of the other categories on this site. Some are not mine, but are just added here for my own personal reference.</p>
        <div>
          {links.map(x => (
            <LinkBlank className={classes.linkContainer} key={x.id} to={x.href}>
              <Card
                right
                classes={{ cardTitle: classes.cardTitle }}
                name={x.name}
                src={createOptimizedSrc(x.src, { quality: app.config.imageQualityAmp, width: 570 })}
                description={this.descriptionize(x)}
              />
            </LinkBlank>
          ))}
        </div>
      </Container>
    )
  }
}
