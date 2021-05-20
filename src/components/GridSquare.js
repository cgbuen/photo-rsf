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
      margin: '0 10px 10px',
      padding: 15,
      textAlign: 'center',
      '@media (max-width:630px)': {
        width: '100%',
      },
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardBody: {
      display: 'flex',
      alignItems: 'center',
      '@media (max-width:630px)': {
        display: 'block'
      },
    },
    cardFigure: {
      marginBottom: 5,
      width: 250,
      '@media (max-width:630px)': {
        display: 'block',
        marginBottom: '0 auto 15px',
        padding: '0 48px',
        width: '100%',
      },
    },
    cardImg: {
      display: 'block',
    },
  })
)
@inject('app')
@observer
export default class GridSquare extends Component {
  render() {
    const { classes, className, src, name, description, onClick } = this.props
    return (
      <Row className={classnames(classes.card, className)} onClick={onClick}>
        <div className={classes.cardBody}>
          <img className={classnames(classes.cardFigure, classes.cardImg)} src={src} alt={name} width="250" />
        </div>
        <div className={classes.cardTitle}>{name}</div>
        <div className={classes.cardDescription}>{description}</div>
      </Row>
    )
  }
}
