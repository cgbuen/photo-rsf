import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'react-storefront/AppBar'
import { withStyles } from '@material-ui/core/styles'
import Logo from '../assets/react-storefront-logo.svg'
import HeaderLogo from 'react-storefront/HeaderLogo'
import Hidden from '@material-ui/core/Hidden'
import Menu from 'react-storefront/Menu'

@withStyles(theme => ({
  root: {
    height: '64px',
    position: 'relative'
  },
}))
@inject('app')
@observer
export default class Header extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <AppBar classes={{ root: classes.root }} menuAlign="right" menuIconProps={{ label: false }}>
          <Menu align="right" useExpanders />
          <HeaderLogo>
            <Logo />
          </HeaderLogo>
          <Hidden xsDown implementation="css">
          </Hidden>
          <div style={{ flex: 1 }} />
        </AppBar>
      </div>
    )
  }
}
