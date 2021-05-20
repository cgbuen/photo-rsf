import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'react-storefront/AppBar'
import { withStyles } from '@material-ui/core/styles'
import HeaderLogo from 'react-storefront/HeaderLogo'
import Hidden from '@material-ui/core/Hidden'
import Menu from 'react-storefront/Menu'
import ListItemText from '@material-ui/core/ListItemText'
import NavTabs from 'react-storefront/NavTabs'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@withStyles(theme => ({
  root: {
    height: '64px',
    position: 'relative',
    zIndex: 0,
  },
  headerLogo: {
    textDecoration: 'none',
  },
  headline: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 1,
    textDecoration: 'underline',
    textDecorationColor: '#69c',
  },
  subtitle: {
    color: 'white',
    fontSize: 10,
  },
  navTabsRoot: {
    boxShadow: 'none'
  },
  navTabsScroller: {
    marginBottom: '0 !important'
  },
  listItem: {
    padding: '10px 15px'
  },
  wrap: {
    background: 'none',
    borderColor: 'rgba(255, 255, 255, .12)',
    color: 'white',
  },
}))
@inject('app')
@observer
export default class Header extends Component {
  render() {
    const { classes } = this.props

    return (
        <AppBar
          classes={{
            root: classes.root,
            wrap: classes.wrap
          }}
          menuAlign="right"
          menuIconProps={{ label: false }}
        >
          <Hidden mdUp implementation="css">
            <Menu
              align="right"
              trackSelected
              itemContentRenderer={(item, leaf) => {
                return leaf ? <ListItemText className={classes.listItem} primary={item.text} /> : null
              }}
            />
          </Hidden>
          <HeaderLogo classes={{ logoWrap: classes.headerLogo }}>
            <div>
              <div className={classes.headline}>cgbuen</div>
            </div>
          </HeaderLogo>
          <Hidden smDown implementation="css">
            <NavTabs
              classes={{
                root: classes.navTabsRoot,
                scroller: classes.navTabsScroller
              }}
            />
          </Hidden>
          <div style={{ flex: 1 }} />
        </AppBar>
    )
  }
}
