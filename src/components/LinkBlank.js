import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { inject, observer } from 'mobx-react'

@withStyles(
  theme => ({
    link: {
      color: '#69c'
    },
  })
)
@inject('app')
@observer
export default class LinkBlank extends Component {
  render() {
    const { classes, to, children } = this.props
    return (
      <a className={classes.link} href={to} target="_blank" rel="noopener noreferrer">{children}</a>
    )
  }
}
