import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import Link from 'react-storefront/Link'
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
    cardDescription: {
      fontWeight: 'normal',
      visibility: 'visible',
    },
    cardImg: {
      visibility: 'visible',
    },
    cardDupeContainer: {
      position: 'relative',
      '& $cardDescription': {
        visibility: 'hidden',
      },
      '& $cardImg': {
        visibility: 'hidden',
      },
    },
    cheat: {
      background: 'none',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: -15,
      width: '100%',
      '& $cardTitle': {
        visibility: 'hidden',
      },
    },
    visible: {
      visibility: 'visible',
    },
    clickable: {
      pointerEvents: 'auto',
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, links: app.links }))
@observer
export default class Resources extends Component {
  descriptionize(x, linkVisible) {
    const { classes } = this.props
    return (
      <div className={classes.text}>
        {x.description !== 'N/A' ? x.description : ''}{" "}
        {x.author_link !== 'N/A' && linkVisible ? (
            <div>
              By <LinkBlank className={classes.clickable} to={x.author_link}>{x.author_name}</LinkBlank>. Not by me.
            </div>
          )
          : ''
        }
        {x.author_link !== 'N/A' && !linkVisible ? (
            <div>
              By {x.author_name}. Not by me.
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
          <Typography variant="h1">Resources</Typography>
        </Row>
        <p>Below is a list of other resources that don't fall under any of the other categories on this site. Some are not mine, but are just added here for my own personal reference.</p>
        <div>
          {links.map(x => {
            const LinkType = x.href.startsWith('https://') ? LinkBlank : Link
            const link = (
              <LinkType className={classes.linkContainer} to={x.href} key={x.id}>
                <Card
                  right
                  classes={{ cardTitle: classes.cardTitle, cardDescription: classes.cardDescription, cardImg: classes.visible }}
                  name={x.name}
                  src={createOptimizedSrc(x.src, { quality: app.config.imageQualityAmp, width: 570 })}
                  description={this.descriptionize(x, false)}
                />
              </LinkType>
            )
            if (x.author_link && x.author_link !== 'N/A') {
              return (
                <div className={classes.cardDupeContainer} key={x.id}>
                  {link}
                  <Card
                    right
                    className={classes.cheat}
                    classes={{ cardTitle: classes.cardTitle, cardDescription: classes.visible, cardImg: classes.cardImg }}
                    name={x.name}
                    src={createOptimizedSrc(x.src, { quality: app.config.imageQualityAmp, width: 570 })}
                    description={this.descriptionize(x, true)}
                  />
                </div>
              )
            } else {
              return link
            }
          })}
        </div>
      </Container>
    )
  }
}
