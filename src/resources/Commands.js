import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import LinkBlank from '../components/LinkBlank'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

@withStyles(
  theme => ({
    command: {
      width: '20%',
      minWidth: 180,
      '@media (max-width:430px)': {
        minWidth: 0,
        paddingLeft: 10,
      },
    },
    description: {
      width: '80%',
      '@media (max-width:430px)': {
        paddingLeft: 0,
        wordBreak: 'break-word',
      },
    },
    code: {
      background: 'rgba(128, 128, 128, .5)',
      fontSize: 14,
      fontWeight: 'bold',
      padding: '3px 6px 3px 5px',
    },
    aliasesTitle: {
      marginRight: 3,
    },
    aliases: {
      '& code': {
        background: 'rgba(128, 128, 128, .2)',
        color: 'rgba(255, 255, 255, .8)',
        fontSize: 13,
      },
    }
  })
)
@withAmp
@inject(({ app }) => ({ app, commands: app.commands }))
@observer
export default class Commands extends Component {
  codifyCommands(str) {
    const { classes } = this.props
    return (
      str.split(/(!.*?)(\W|$)/).map((x, i) => {
        if (x.startsWith('!')) {
          return <code key={i} className={classes.code}>{x}</code>
        } else {
          return x
        }
      })
    )
  }

  renderMainDescription(x) {
    if (x.href && x.command === 'chrissucks') {
      const separator = 'Many slight misspelling variants'
      const arr = x.description.split(separator)
      return (
        <p>
        {this.codifyCommands(arr[0])}{" "}
        <LinkBlank to={x.href}>{separator}</LinkBlank>{" "}
        {this.codifyCommands(arr[1])}
        </p>
      )
    } else if (x.href && x.command !== 'commands') {
      const arr = x.description.split('ink to')
      return (
        <p>
          <LinkBlank to={x.href}>{this.codifyCommands(arr[0])}ink</LinkBlank> to {this.codifyCommands(arr[1])}
        </p>
      )
    } else {
      return (<p>{this.codifyCommands(x.description)}</p>)
    }
  }

  renderAliases(x) {
    const { classes } = this.props
    const updatedAliases = x.aliases
      .split(', ')
      .map(y => {
        return `${y.includes('many others') ? '' : '!'}${y}`
      })
      .join(', ')
    return x.aliases && (
      <p className={classes.aliases}>
        <i className={classes.aliasesTitle}>Alias{x.aliases.split(',').length === 1 ? '' : 'es'}:</i>{""}
        {this.codifyCommands(updatedAliases)}
      </p>
    )
  }

  render() {
    const { classes, commands } = this.props
    return (
      <Container>
        <Row>
          <Typography variant="h1">Commands</Typography>
        </Row>
        <p>A list of commands that can be used for my Twitch channel chat.</p>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Command</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {commands
                  .sort((a, b) => a.command.localeCompare(b.command))
                  .map(x => (
                    <TableRow key={x.id}>
                      <TableCell className={classes.command}>
                        <code className={classes.code}>!{x.command}</code>
                      </TableCell>
                      <TableCell className={classes.description}>
                        {this.renderMainDescription(x)}
                        {this.renderAliases(x)}
                      </TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </div>
      </Container>
    )
  }
}
