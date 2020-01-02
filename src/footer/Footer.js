import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Link from 'react-storefront/Link'
import Instagram from '../assets/instagram.svg'
import Mail from '@material-ui/icons/MailOutline'
import classnames from 'classnames'

@withStyles(theme => ({
  root: {
    background: 'white',
    bottom: 0,
    maxWidth: 'none',
    textAlign: 'center',
    width: '100%',
  },
  iconWrapper: {
    color: '#aaa',
    display: 'inline-block',
    height: 50,
    margin: '0 15px',
    padding: 6,
    verticalAlign: 'middle',
    width: 50,
  },
  iconWrapperMail: {
    padding: 0
  },
  icon: {
    fill: 'currentColor',
    height: '100%',
    userSelect: 'none',
    width: '100%',
  },
  '@media (prefers-color-scheme: dark)': {
    root: {
      background: '#222',
    },
    iconWrapper: {
      color: 'white',
    }
  },
}))
@inject(({ app }) => ({ social: app.social }))
@observer
export default class Footer extends Component {
  render() {
    const { classes, social } = this.props
    return (
      <Container className={classes.root}>
        <Row className={classes.social}>
          <Link server to={social.instagram} className={classes.iconWrapper}>
            <Instagram className={classes.icon} />
          </Link>
          <Link server to={social.email} className={classnames(classes.iconWrapperMail, classes.iconWrapper)}>
            <Mail className={classes.icon} />
          </Link>
        </Row>
        <Row className={classes.copyright}>
          &copy; {(new Date()).getYear() + 1900} Christopher Buenaventura
        </Row>
      </Container>
    )
  }
}
