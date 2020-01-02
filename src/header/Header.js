import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'react-storefront/AppBar'
import { withStyles } from '@material-ui/core/styles'
import HeaderLogo from 'react-storefront/HeaderLogo'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Menu from 'react-storefront/Menu'
import ListItemText from '@material-ui/core/ListItemText'
import NavTabs from 'react-storefront/NavTabs'

@withStyles(theme => ({
  root: {
    height: '64px',
    position: 'relative',
  },
  headerLogo: {
    textDecoration: 'none',
  },
  headline: {
    fontSize: 32,
    lineHeight: 1,
    textDecoration: 'underline',
    textDecorationColor: '#69c',
  },
  subtitle: {
    fontSize: 10,
  },
  navTabsRoot: {
    boxShadow: 'none'
  },
  listItem: {
    padding: '10px 15px !important'
  },
  '@media (prefers-color-scheme: dark)': {
    wrap: {
      background: '#222',
      borderColor: 'rgba(255, 255, 255, .12)',
      color: 'white'
    },
    headline: {
      color: 'white'
    },
    subtitle: {
      color: 'white'
    },
  },
}))
@inject('app')
@observer
export default class Header extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
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
              itemContentRenderer={(item, leaf) => {
                return leaf ? <ListItemText className={classes.listItem} primary={item.text} /> : null
              }}
            />
          </Hidden>
          <HeaderLogo classes={{ logoWrap: classes.headerLogo }}>
            <div>
              <Typography variant="h1" className={classes.headline}>cgbuen</Typography>
              <Typography className={classes.subtitle}>Concert Photography</Typography>
            </div>
          </HeaderLogo>
          <Hidden smDown implementation="css">
            <NavTabs
              classes={{
                root: classes.navTabsRoot
              }}
            />
          </Hidden>
          <div style={{ flex: 1 }} />
        </AppBar>
      </div>
    )
  }
}
