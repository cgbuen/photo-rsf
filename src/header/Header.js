import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'react-storefront/AppBar'
import { withStyles } from '@material-ui/core/styles'
import HeaderLogo from 'react-storefront/HeaderLogo'
import Hidden from '@material-ui/core/Hidden'
import Menu from '../components/Menu'
import ListItemText from '@material-ui/core/ListItemText'
import NavTabs from '../components/NavTabs'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@withStyles(theme => ({
  root: {
    height: 64,
  },
  headerLogo: {
    justifyContent: 'left',
    textDecoration: 'none',
    marginLeft: 0,
    marginRight: 10,
  },
  headline: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 1,
    position: 'relative',
    textDecoration: 'underline',
    textDecorationColor: '#69c',
    top: -4,
  },
  subtitle: {
    color: 'white',
    fontSize: 10,
  },
  navTabsRoot: {
    boxShadow: 'none'
  },
  listItem: {
    padding: '10px 15px'
  },
  wrap: {
    background: '#151515',
    borderColor: 'rgba(255, 255, 255, .12)',
    color: 'white',
  },
  toolBar: {
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    maxWidth: 960,
    padding: '0 15px',
  },
}))
@inject('app')
@observer
export default class Header extends Component {
  closeMenu() {
    this.props.app.menu.close()
  }

  render() {
    const { classes } = this.props

    return (
      <AppBar
        classes={{
          root: classes.root,
          wrap: classes.wrap,
          toolBar: classes.toolBar,
        }}
        menuAlign="right"
        menuIconProps={{ label: false }}
      >
        <HeaderLogo classes={{ logoWrap: classes.headerLogo }}>
          <div>
            <div className={classes.headline} onClick={() => this.closeMenu()}>cgbuen</div>
          </div>
        </HeaderLogo>
        <Hidden mdUp implementation="css">
          <Menu
            align="right"
            trackSelected
            itemContentRenderer={(item, leaf) => {
              return leaf ? <ListItemText className={classes.listItem} primary={item.text} /> : null
            }}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <NavTabs
            classes={{
              root: classes.navTabsRoot,
            }}
          />
        </Hidden>
      </AppBar>
    )
  }
}
