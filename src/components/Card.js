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
      transition: 'background .2s ease-in-out',
      '&:hover': {
        background: 'rgba(128, 128, 128, .35)',
      },
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardBody: {
      alignItems: 'center',
      display: 'flex',
      '@media (max-width:568px)': {
        display: 'block'
      },
    },
    'cardBodyRight': {
      justifyContent: 'space-between',
    },
    cardFigure: {
      margin: '0 15px 0 0',
      width: 250,
      '@media (max-width:568px)': {
        display: 'block',
        margin: '0 0 15px 0',
        width: '100%',
      },
    },
    'right': {
      margin: '0 0 0 15px',
      '@media (max-width:568px)': {
        margin: '15px 0 0 0',
      },
    },
    cardImg: {
      display: 'block',
      visibility: 'visible',
    },
    cardDescription: {
      visibility: 'visible',
    },
  })
)
@inject('app')
@observer
export default class Card extends Component {
  render() {
    const { classes, className, src, name, description, onClick, right } = this.props
    return (
      <Row className={classnames(classes.card, className)} onClick={onClick}>
        <div className={classnames({
          [classes.cardBody]: true,
          [classes.cardBodyRight]: right,
        })}>
          {!right && <img className={classnames(classes.cardFigure, classes.cardImg)} src={src} alt={name} />}
          <div>
            <div className={classes.cardTitle}>{name}</div>
            <div className={classes.cardDescription}>{description}</div>
          </div>
          {right && <img className={classnames(classes.cardFigure, classes.right, classes.cardImg)} src={src} alt={name} />}
        </div>
      </Row>
    )
  }
}
