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
      transition: 'background .2s ease-in-out',
      '&:hover': {
        background: 'rgba(128, 128, 128, .35)',
      },
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
      position: 'relative',
      width: 250,
      '@media (max-width:630px)': {
        display: 'block',
        margin: '0 auto 5px',
      },
    },
    cardImg: {
      display: 'block',
    },
    cardDescription: {
      fontSize: 16,
    },
    iconContainer: {
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
    icon: {
      fill: '#69c',
      filter: 'drop-shadow(2px 1px 1px rgba(255, 255, 255, .3))',
      display: 'inline-block',
      height: 20,
      verticalAlign: 'middle',
      width: 20,
    },
    build: {
      height: 17,
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
          <div className={classes.cardFigure}>
            <img className={classes.cardImg} src={src} alt={name} width="250" />
            <div className={classes.iconContainer}>
            </div>
          </div>
        </div>
        <div className={classes.cardTitle}>{name}</div>
        <div className={classes.cardDescription}>{description}</div>
      </Row>
    )
  }
}
