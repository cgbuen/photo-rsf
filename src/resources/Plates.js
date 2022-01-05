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
      width: '25%',
    },
    kerf: {
      width: '12.5%',
    },
    description: {
      width: '62.5%',
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, plates: app.plates }))
@observer
export default class Plates extends Component {
  renderNotes() {
    const { classes } = this.props
    return (
      <Accordion>
        <AccordionSummary className={classes.accordionTitle} expandIcon={<ExpandMoreIcon />}>Notes</AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>Each plate is for an HHKB-style layout, including: split right shift, split backspace, and blocked bottom corners (even for tray mount designs, so they'll be blocked solely by the plate themselves, not by any top case).</li>
            <li>Unless otherwise specified, plates will: have a 1u-1.5u-7u-1.5u-1u bottom row; use MX PCB-mount stabilizer cutouts; and exclude center- and spacebar-position screwholes (specifically for tray-mount plates).</li>
            <li>For MX, you'll want to get these cut in materials that are around 1.5mm thick. For Alps, it's recommended to cut these in materials between 1.0mm to 1.2mm thick (but I have personally gone down as low as 0.8mm and retaining backing layers).</li>
            <li>I use Ponoko to cut plates. They (as with any other service) won't necessarily provide every material in every thickness. These files are all in SVG format, which upload rather quickly to their application (compared to DXF).</li>
            <li>Generally, I'll use softer materials for higher kerf values (e.g. 0.2mm), and harder materials for lower values (e.g. 0.15mm), but your mileage may vary. I have only included one kerf variation for each plate.</li>
          </ul>
        </AccordionDetails>
      </Accordion>
    )
  }
  renderTable(name, extras) {
    const { classes, plates } = this.props
    return (
      <Accordion defaultExpanded={true}>
        <AccordionSummary className={classes.accordionTitle} expandIcon={<ExpandMoreIcon />}>Plates</AccordionSummary>
        <AccordionDetails>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Plate</TableCell>
                <TableCell>Kerf</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {plates
                  .map(x => (
                    <TableRow key={x.id}>
                      <TableCell className={classes.item}>
                      {x.src.includes('n/a') ? x.name : (<LinkBlank to={x.src}>{x.name}</LinkBlank>)}
                      </TableCell>
                      <TableCell className={classes.kerf}>
                        {x.kerf}mm
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
          <Typography variant="h1">Plates</Typography>
        </Row>
        <p>Below is a list of HHKB plate files that I have used for different keyboard build projects.</p>
        {this.renderNotes()}
        {this.renderTable()}
      </Container>
    )
  }
}
