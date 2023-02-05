/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import Track from 'react-storefront/Track'
import Link from 'react-storefront/Link'
import Tab from '@material-ui/core/Tab'
import withStyles from '@material-ui/core/styles/withStyles'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { lazyState } from 'react-storefront/utils/state'

export const styles = theme => ({
  root: {
    height: 64,
    [theme.breakpoints.up('md')]: {
      minWidth: '135px'
    }
  },
  clickEl: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  label: {
    whiteSpace: 'nowrap'
  },
  link: {
    display: 'block',
    height: 64,
    fontSize: theme.typography.body1.fontSize
  },
  menu: {
    padding: `${theme.margins.container}px`
  },
  menuItem: {
    padding: `1em ${theme.margins.container}px`
  },
  tabWrapper: {},
  selected: {}
})

@withStyles(styles, { name: 'RSFNavTab' })
@observer
export default class NavTab extends Component {
  render() {
    const {
      classes,
      state,
      url,
      prefetch,
      text,
      item,
      selected,
      menuButtonRenderer,
      tabProps,
      blank
    } = this.props

    return (
      <Track event="topNavClicked" item={item}>
        <div className={classes.tabWrapper}>
          <Link
            state={lazyState(state)}
            className={classnames(classes.link, { [classes.selected]: selected })}
            to={url}
            prefetch={prefetch}
            onClick={this.props.onClick}
            anchorProps={{
              onMouseEnter: this.onMouseEnter,
              onMouseLeave: this.props.onMouseLeave,
              'data-th': 'nav',
              target: blank ? '_blank' : undefined,
              rel: blank ? 'noopener noreferer' : undefined
            }}
          >
            <Tab
              className={classes.root}
              label={text}
              classes={{
                label: classes.label
              }}
              {...tabProps}
            />
          </Link>
          {menuButtonRenderer && menuButtonRenderer(this.getMenu())}
        </div>
      </Track>
    )
  }

  onMouseEnter = e => {
    this.props.onMouseEnter({
      target: e.currentTarget,
      menu: this.getMenu()
    })
  }

  getMenu() {
    const { children, item, classes, onItemClick } = this.props

    if (children) {
      return children
    } else if (item.items && item.items.length) {
      return (
        <div className={classes.menu}>
          {item.items.map((item, i) => (
            <div key={i} className={classes.menuItem}>
              <Link to={item.url} onClick={onItemClick}>
                {item.text}
              </Link>
            </div>
          ))}
        </div>
      )
    } else {
      return null
    }
  }
}
