import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import classnames from 'classnames'
import { createOptimizedSrc } from 'react-storefront/imageService'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

@withStyles(
  theme => ({
    headerRow: {
      height: 'auto',
      '& th': {
        paddingTop: 0,
        paddingBottom: 12,
        whiteSpace: 'nowrap',
      },
    },
    headerText: {
      cursor: 'pointer',
      verticalAlign: 'middle',
    },
    sorted: {
      '&:after': {
        content: '""',
        width: 0,
        height: 0,
        display: 'inline-block',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '5px solid white',
        marginLeft: 5,
      },
    },
    reversed: {
      '&:after': {
        borderBottom: '5px solid white',
        borderTop: '0'
      },
    },
    keysetImg: {
      display: 'block',
      width: 100,
    },
    date: {
      whiteSpace: 'nowrap',
    },
  })
)
@inject(({ app }) => ({ app, keysets: app.keysets }))
@observer
export default class Keysets extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderSortCell(sortField, displayName) {
    const { app, classes } = this.props
    return (
      <TableCell className={classnames({
          [classes.sorted]: app.keysetSort === sortField,
          [classes.reversed]: !app.keysetDesc,
      })} onClick={() => app.sortKeysets(sortField)}>
        <span className={classes.headerText}>{displayName}</span>
      </TableCell>
    )
  }

  render() {
    const { app, classes, keysets } = this.props

    return (
      <>
        <Table>
          <TableHead>
            <TableRow className={classes.headerRow}>
              <TableCell></TableCell>
              {this.renderSortCell('keyset', 'Name')}
              {this.renderSortCell('purchase_date', 'Purchased')}
              {this.renderSortCell('mount', 'Mount')}
              {this.renderSortCell('category', 'Category')}
              {this.renderSortCell('mount_status', 'Status')}
              {this.renderSortCell('keyboard', 'Keyboard')}
            </TableRow>
          </TableHead>
          <TableBody>
            {keysets.map(x => (
              <TableRow key={x.id}>
                <TableCell>{<img className={classes.keysetImg} src={createOptimizedSrc(x.src, { quality: app.config.imageQuality, width: 200 })} alt={x.keyset} width="100" />}</TableCell>
                <TableCell>{x.keyset}</TableCell>
                <TableCell><span className={classes.date}>{x.purchase_date}</span></TableCell>
                <TableCell>{x.mount}</TableCell>
                <TableCell>{x.category}</TableCell>
                <TableCell>{x.mount_status}</TableCell>
                <TableCell>{x.keyboard}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  }
}
