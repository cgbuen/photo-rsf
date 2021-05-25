import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

@withStyles(
  theme => ({
    link: {
      color: '#69c',
      fontWeight: 'bold',
    },
  })
)
@inject('app')
@observer
export default class LinkBlank extends Component {
  render() {
    const { classes, className, to, onClick, children } = this.props
    return (
      <a className={classnames(classes.link, className)} href={to} onClick={onClick} target="_blank" rel="noopener noreferrer">{children}</a>
    )
  }
}
