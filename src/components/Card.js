import React, { Component } from 'react'
import Row from 'react-storefront/Row'
import withStyles from '@material-ui/core/styles/withStyles'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

@withStyles(
  theme => ({
    card: {
      background: 'rgba(128, 128, 128, .15)',
      boxShadow: '1px 1px 7px 0 rgba(32, 32, 32, .3)',
      padding: 20,
    },
    cardTitle: {
      fontSize: 20,
      marginBottom: 10
    },
    cardBody: {
      display: 'flex',
      alignItems: 'center',
      '@media (max-width:568px)': {
        display: 'block'
      },
    },
    cardFigure: {
      marginRight: 15,
      width: 250,
      '@media (max-width:568px)': {
        display: 'block',
        marginBottom: 15,
        width: '100%',
      },
    },
  })
)
@inject('app')
@observer
export default class Card extends Component {
  render() {
    const { classes, className, src, name, description } = this.props
    return (
      <Row className={classnames(classes.card, className)}>
        <div className={classes.cardTitle}>{name}</div>
        <div className={classes.cardBody}>
          <img className={classes.cardFigure} src={src} alt={name} />
          <div className={classes.cardDescription}>{description}</div>
        </div>
      </Row>
    )
  }
}
