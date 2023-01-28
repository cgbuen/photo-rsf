import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import { createOptimizedSrc } from 'react-storefront/imageService'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogClose from 'react-storefront/DialogClose'
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
    clickable: {
      cursor: 'pointer',
    },
    keysetImg: {
      display: 'block',
      width: 100,
    },
    date: {
      whiteSpace: 'nowrap',
    },
    dialogInnerTitle: {
      verticalAlign: 'middle',
    },
    expand: {
      cursor: 'pointer',
      fontSize: 14,
      marginLeft: 10,
      userSelect: 'none',
      verticalAlign: 'middle',
    },
    highlight: {
      color: '#69c',
    },
    dialogImgWrapper: {
      position: 'relative',
    },
    descriptionBox: {
      background: 'rgba(64, 64, 64, 0.4)',
      left: 15,
      padding: 10,
      position: 'absolute',
      textShadow: '1px 1px 1px rgba(64, 64, 64, 0.4)',
      top: 15,
      '@media (max-width:925px)': {
        background: 'none',
        maxWidth: 'none',
        padding: '10px 0 0',
        position: 'static',
      },
    },
    descriptionColumnWrapper: {
      width: 'auto',
      '@media (max-width:925px)': {
        display: 'flex',
      },
      '@media (max-width:630px)': {
        display: 'block',
      },
    },
    descriptionColumn: {
      width: 'auto',
      '@media (max-width:925px)': {
        width: '50%',
      },
      '@media (max-width:630px)': {
        width: 'auto',
      },
    },
  })
)
@inject(({ app }) => ({ app, keysets: app.keysets, openKeyset: app.openKeyset }))
@observer
export default class Keysets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keysetDetailsOpen: false,
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

  handleKeysetDetailsOpen = (val) => {
    return () => {
      this.setState({ keysetDetailsOpen: val })
    }
  }

  openDialog(keyset) {
    if (!keyset.src.includes('unavailable')) {
      this.props.app.setOpenKeyset(keyset)
    }
  }

  closeDialog() {
    this.props.app.setOpenKeyset({})
    this.setState({ keysetDetailsOpen: false })
  }

  renderDetailKeyboard(x) {
    const { classes } = this.props
    if (x.keyboard) {
      let val = `Current keyboard: ${x.keyboard}`
      if (x.pictured && x.keyboard !== x.pictured) {
        val += ` (pictured here on: ${x.pictured})`
      }
      return <div className={classes.descriptionDetail}>{val}</div>
    } else if (x.pictured) {
      return <div className={classes.descriptionDetail}>Pictured on: {x.pictured}</div>
    }
  }

  descriptionize(x) {
    const { classes } = this.props
    return (
      <div className={classes.descriptionColumnWrapper}>
        <div className={classes.descriptionColumn}>
          <div className={classes.descriptionDetail}>Purchased: {x.purchase_date} ({x.purchase_status})</div>
          <div className={classes.descriptionDetail}>Mount: {x.mount}</div>
          <div className={classes.descriptionDetail}>Color: {x.color}</div>
          <div className={classes.descriptionDetail}>Status: {x.mount_status}</div>
          <div className={classes.descriptionDetail}>HHKB?: {x.tkl_only ? 'No' : 'Yes'}</div>
          {this.renderDetailKeyboard(x)}
          {x.notes && <div className={classes.descriptionDetail}>Notes: {x.notes}</div>}
        </div>
      </div>
    )
  }

  render() {
    const { app, classes, keysets, openKeyset } = this.props
    const { keysetDetailsOpen } = this.state

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
              <TableRow key={x.id} className={classnames(!x.src.includes('unavailable') && classes.clickable)} onClick={() => this.openDialog(x)}>
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
        <Dialog maxWidth="xl" open={!!openKeyset.keyset}>
          <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
            <Typography variant="h1" component="h6" className={classes.title}>
              {openKeyset &&
                <>
                  <span className={classes.dialogInnerTitle}>{openKeyset.keyset}</span>
                  <span className={classes.expand} onClick={this.handleKeysetDetailsOpen(!keysetDetailsOpen)}>
                    <span className={classes.highlight}>[</span>
                      {keysetDetailsOpen ? <>&ndash; hide</> : '+ show'} keyset details
                    <span className={classes.highlight}>]</span>
                  </span>
                </>
              }
            </Typography>
            <DialogClose onClick={() => this.closeDialog()} />
          </DialogTitle>
          <DialogContent>
            <div className={classes.dialogImgWrapper}>
              <img className={classes.modalImg} alt={classes.name} src={openKeyset && openKeyset.src && createOptimizedSrc(openKeyset.src, { quality: app.config.imageQuality })} width="1080" />
              {
                keysetDetailsOpen && (
                  <div className={classes.descriptionBox}>
                    {this.descriptionize(openKeyset)}
                  </div>
                )
              }
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}
