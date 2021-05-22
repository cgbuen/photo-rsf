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
@inject(({ app }) => ({ app, gear: app.gear }))
@observer
export default class Gear extends Component {
  renderAccordion({ title, description, items }) {
    const { classes } = this.props
    return (
      <Accordion>
        <AccordionSummary className={classes.accordionTitle} expandIcon={<ExpandMoreIcon />}>{title}</AccordionSummary>
        <AccordionDetails>
          <p>{description}</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {items
                  .map(x => (
                    <TableRow key={x.id}>
                      <TableCell className={classes.tableHeading} className={classes.item}>
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
    const { gear } = this.props
    return (
      <Container>
        <Row>
          <Typography variant="h1">Gear</Typography>
        </Row>
        <p>A list of recommended gear.</p>
        <div>
          {/*this.renderAccordion({ title: 'Primary PC', description: '', items: gear.filter(x => x.kind === 'PC (Gaming/Workhorse)') })*/}
          {/*this.renderAccordion({ title: 'Streaming PC', description: '', items: gear.filter(x => x.kind === 'Streaming PC') })*/}
          {/*this.renderAccordion({ title: 'Development / Everyday Machine', description: '', items: gear.filter(x => x.kind === 'Development/Everyday Machine') })*/}
          {/*this.renderAccordion({ title: 'Displays', description: '', items: gear.filter(x => x.kind === 'Displays') })*/}
          {/*this.renderAccordion({ title: 'Mice', description: '', items: gear.filter(x => x.kind === 'Peripherals') })*/}
          {/*this.renderAccordion({ title: 'Desktop Audio', description: '', items: gear.filter(x => x.kind === 'Desktop Audio') })*/}
          {/*this.renderAccordion({ title: 'Home Theater Audio', description: '', items: gear.filter(x => x.kind === 'Home Theater Audio') })*/}
          {this.renderAccordion({ title: 'Stream Video', description: '', items: gear.filter(x => x.kind === 'Stream Video/Digital Photography' || x.kind === 'Multi-Purpose Lenses') })}
          {this.renderAccordion({ title: 'Stream Audio', description: '', items: gear.filter(x => x.kind === 'Stream Audio') })}
          {this.renderAccordion({ title: 'Lighting', description: '', items: gear.filter(x => x.kind === 'Lighting') })}
          {this.renderAccordion({ title: 'Film Photography', description: '', items: gear.filter(x => x.kind === 'Film Photography' || x.kind === 'Multi-Purpose Lenses') })}
          {this.renderAccordion({ title: 'Film Development', description: '', items: gear.filter(x => x.kind === 'Film Development') })}
          {this.renderAccordion({ title: 'Film Scanning', description: '', items: gear.filter(x => x.kind === 'Film Scanning') })}
          {this.renderAccordion({ title: 'Soldering', description: '', items: gear.filter(x => x.kind === 'Electronics/Soldering') })}
          {this.renderAccordion({ title: 'Nintendo Switch', description: '', items: gear.filter(x => x.kind === 'Nintendo Switch') })}
          {/*this.renderAccordion({ title: 'Music', description: '', items: gear.filter(x => x.kind === 'Music') })*/}
          {/*this.renderAccordion({ title: 'Other', description: '', items: gear.filter(x => x.kind === 'Other') })*/}
        </div>
      </Container>
    )
  }
}
