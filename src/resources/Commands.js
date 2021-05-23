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
    tableHeading: {
      fontSize: 15,
      fontWeight: 'bold',
    }
  })
)
@withAmp
@inject(({ app }) => ({ app, commands: app.commands }))
@observer
export default class Commands extends Component {
  renderMainDescription(x) {
    if (x.href && x.command !== 'commands') {
      const arr = x.description.split('ink to')
      return (
        <p>
          <LinkBlank to={x.href}>{arr[0]}ink</LinkBlank> to {arr[1]}
        </p>
      )
    } else {
      return (<p>{x.description}</p>)
    }
  }

  renderAliases(x) {
    return x.aliases && (
      <p>
        <i>
          Aliases:{" "}
          {x.aliases
            .split(', ')
            .map(y => {
              return `${y.includes('many others') ? '' : '!'}${y}`
            })
            .join(', ')
          }
      </i>
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
                      <TableCell className={classes.tableHeading}>!{x.command}</TableCell>
                      <TableCell>
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
