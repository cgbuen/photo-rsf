/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ListItem from '@material-ui/core/ListItem'
import classnames from 'classnames'
import ItemContent from 'react-storefront/menu/ItemContent'
import Link from 'react-storefront/Link'
import MenuContext from 'react-storefront/menu/MenuContext'

@inject('app')
@observer
export default class Leaf extends Component {
  static contextType = MenuContext

  render() {
    const { item, app, trackSelected, ...others } = this.props
    const { classes } = this.context

    return (
      <Link
        to={item.url}
        className={classes.link}
        server={item.server}
        state={item.state ? () => JSON.parse(item.state) : null}
        onClick={this.onClick}
        anchorProps={{
          target: item.blank ? '_blank' : undefined,
          rel: item.blank ? 'noopener noreferer' : undefined
        }}
      >
        <ListItem
          button
          divider
          selected={trackSelected && app.location.pathname === item.url.replace(/\?.*/, '')}
          classes={{
            root: classnames(classes.listItem, classes.leaf, item.className)
          }}
        >
          <ItemContent {...others} item={item} showExpander={false} leaf />
        </ListItem>
      </Link>
    )
  }

  onClick = () => {
    this.props.app.menu.close()
  }
}
