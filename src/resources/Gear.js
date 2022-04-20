import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import LinkBlank from '../components/LinkBlank'
import Accordion from '@material-ui/core/ExpansionPanel'
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary'
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

@withStyles(
  theme => ({
    accordionTitle: {
      fontWeight: 'bold'
    },
    item: {
      width: '45%',
    },
    description: {
      width: '55%',
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, gear: app.gear, gearDescriptions: app.gearDescriptions, }))
@observer
export default class Gear extends Component {
  renderAccordion(name, extras) {
    const { classes, gear, gearDescriptions } = this.props
    return (
      <Accordion>
        <AccordionSummary className={classes.accordionTitle} expandIcon={<ExpandMoreIcon />}>{name}</AccordionSummary>
        <AccordionDetails>
          <div>
            {(gearDescriptions.find(x => x.name === name) || { description: '' })
              .description
              .split('\n\n')
              .map(x => (<p key={x.id}>{x}</p>))
            }
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {gear
                  .filter(x => {
                    return x.active && (x.kind === name || (extras && extras.includes(x.kind)))
                  })
                  .map(x => (
                    <TableRow key={x.id}>
                      <TableCell className={classes.item}>
                        <LinkBlank to={x.url}>{x.name}</LinkBlank>
                      </TableCell>
                      <TableCell className={classes.description}>
                        {x.notes}
                      </TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    )
  }
  render() {
    return (
      <Container>
        <Row>
          <Typography variant="h1">Gear</Typography>
        </Row>
        <p>A list of gear that I recommend.</p>
        <div>
          {/*this.renderAccordion('Primary PC')*/}
          {/*this.renderAccordion('Streaming PC')*/}
          {/*this.renderAccordion('Development / Everyday Machine')*/}
          {/*this.renderAccordion('Displays')*/}
          {/*this.renderAccordion('Mice')*/}
          {/*this.renderAccordion('Desktop Audio')*/}
          {/*this.renderAccordion('Home Theater Audio')*/}
          {this.renderAccordion('Stream Video')}
          {this.renderAccordion('Stream Audio')}
          {this.renderAccordion('Lighting')}
          {this.renderAccordion('Soldering')}
          {/*this.renderAccordion('Film Photography')*/}
          {this.renderAccordion('Film Development')}
          {this.renderAccordion('Film Scanning')}
          {this.renderAccordion('Nintendo Switch')}
          {/*this.renderAccordion('Music')*/}
          {/*this.renderAccordion('Other')*/}
        </div>
      </Container>
    )
  }
}
