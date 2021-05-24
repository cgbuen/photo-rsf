import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import GridSquare from '../components/GridSquare'
import withStyles from '@material-ui/core/styles/withStyles'
import classnames from 'classnames'
import { createOptimizedSrc } from 'react-storefront/imageService'
import LinkBlank from '../components/LinkBlank'
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogClose from 'react-storefront/DialogClose'

@withStyles(
  theme => ({
    hide: {
      display: 'none',
    },
    blurb: {
      marginBottom: 20,
    },
    topSection: {
      display: 'flex',
      justifyContent: 'space-between',
      '@media (max-width:568px)': {
        display: 'block',
      },
    },
    results: {
      fontWeight: 'bold',
      padding: '5px 0 15px',
      whiteSpace: 'nowrap',
      '@media (max-width:568px)': {
        textAlign: 'right',
      },
    },
    filtersWhole: {
      display: 'flex',
    },
    filtersLabel: {
      display: 'inline-block',
      fontWeight: 'bold',
      margin: '6px 15px 0 0',
    },
    filter: {
      background: '#333',
      borderRadius: 3,
      color: 'white',
      cursor: 'pointer',
      display: 'inline-block',
      flex: 1,
      fontWeight: 'bold',
      margin: '0 15px 10px 0',
      padding: '5px 10px',
    },
    'icon': {
      display: 'inline-block',
      marginRight: 3,
      verticalAlign: 'middle',
    },
    'iconUnchecked': {
      display: 'block',
    },
    'iconChecked': {
      display: 'none',
    },
    filterText: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    filterActive: {
      background: '#69c',
      '& $iconUnchecked': {
        display: 'none'
      },
      '& $iconChecked': {
        display: 'block;'
      }
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      margin: '0 -10px',
      '@media (max-width:925px)': {
      justifyContent: 'center',
      },
    },
    clickable: {
      cursor: 'pointer',
    },
    stubBox: {
      width: 300,
    },
    noResultsMessage: {
      fontStyle: 'italic',
      margin: 10,
    },
    dialogImgWrapper: {
      position: 'relative',
    },
    modalImg: {
      display: 'block',
      width: '100%',
    },
    descriptionBox: {
      background: 'rgba(128, 128, 128, 0.5)',
      bottom: 15,
      padding: 10,
      maxWidth: 250,
      position: 'absolute',
      right: 15,
      textShadow: '1px 1px 1px rgba(128, 128, 128, 0.5)',
      '&.topLeft': {
        bottom: 'auto',
        left: 15,
        right: 'auto',
        top: 15,
      },
      '&.topRight': {
        bottom: 'auto',
        top: 15,
      },
      '&.bottomLeft': {
        left: 15,
        right: 'auto',
      },
      '@media (max-width:925px)': {
        background: 'none',
        maxWidth: 'none',
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
    descriptionLink: {
      color: 'white',
      fontWeight: 'bold',
      textDecorationColor: '#69c',
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, social: app.social, builds: app.builds, buildFiltersActive: app.buildFiltersActive, openBuild: app.openBuild }))
@observer
export default class Collection extends Component {
  showable(x) {
    return x && !x.includes('TBD') && !x.includes('?') && !x.includes('[planned]') && !x.includes('[prop]') && !x.includes('[stock]') && !x.includes('Stock') && !x.includes('N/A')
  }

  buildLinks(x) {
    const { classes } = this.props
    const links = []
    if (x.build_video && !x.type_test) {
      links.push((<LinkBlank className={classes.descriptionLink} to={x.build_video}>Build video</LinkBlank>))
    } else if (x.build_video && x.type_test && x.type_test.includes(x.build_video)) {
      links.push((
        <span>
          <LinkBlank className={classes.descriptionLink} to={x.build_video}>Build video</LinkBlank>{" "}
          (<LinkBlank className={classes.descriptionLink} to={x.type_test}>type test timestamp</LinkBlank>)
        </span>
      ))
    } else if (x.build_video && x.type_test && !x.type_test.includes(x.build_video)) {
      links.push((<LinkBlank className={classes.descriptionLink} to={x.build_video}>Build video</LinkBlank>))
      links.push((<LinkBlank className={classes.descriptionLink} to={x.type_test}>type test</LinkBlank>))
    } else if (!x.build_video && x.type_test) {
      links.push((<LinkBlank className={classes.descriptionLink} to={x.type_test}>Type test</LinkBlank>))
    }
    if (this.showable(x.instagram)) {
      links.push((<LinkBlank className={classes.descriptionLink} to={x.instagram}>Instagram post</LinkBlank>))
    }
    return (
      <div>
        {links.reduce((acc, cv) => (<>{acc}{acc ? ', ' : ''}{cv}</>), '')}
      </div>
    )
  }

  descriptionize(x) {
    const { classes } = this.props
    return (
      <div className={classes.descriptionColumnWrapper}>
        <div className={classes.descriptionColumn}>
          <div>Purchased: {x.date_bought}</div>
          {this.showable(x.date_built) && <div>Built: {x.date_built}</div>}
          <div>Color: {x.color}</div>
          {this.showable(x.plate) && <div>Plate: {x.plate}</div>}
          {this.showable(x.switches) && <div>Switches: {x.switches}</div>}
        </div>
        <div className={classes.descriptionColumn}>
          {this.showable(x.keycaps) && <div>Keycaps: {x.keycaps}</div>}
          {x.notes && (<div>Notes: {x.notes}</div>)}
          {this.buildLinks(x)}
        </div>
      </div>
    )
  }

  renderFilter({ id, name }) {
    const { app, classes, builds, buildFiltersActive } = this.props
    return (
      <div className={classnames(classes.filter, buildFiltersActive[id] && classes.filterActive)} onClick={() => app.toggleFilteredBuilds(id)}>
        <div className={classes.icon}>
          <CheckBoxOutlineBlankSharpIcon className={classes.iconUnchecked} />
          <CheckBoxSharpIcon className={classes.iconChecked} />
        </div>
        <div className={classes.filterText}>{name} ({builds.filter(x => x.assembly_variant.includes('A') && x.build_status === id).length})</div>
      </div>
    )
  }

  openDialog(build) {
    if (!build.src.includes('unavailable')) {
      this.props.app.setOpenBuild(build)
    }
  }

  closeDialog() {
    this.props.app.setOpenBuild({})
  }

  render() {
    const { app, social, classes, builds, openBuild } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Keyboard Collection</Typography>
        </Row>
        <p className={classes.blurb}>I collect, build, and modify enthusiast computer keyboards. (Builds, among other types of content, are streamed to <LinkBlank to={social.twitch}>Twitch</LinkBlank>, with proceeds going to the <LinkBlank to={social.sffb}>San Francisco-Marin Food Bank</LinkBlank>.) This is my personal collection, which is primarily comprised of "Happy Hacking"-layout keyboards (60%, US ANSI, split backspace, split right shift, and corner blockers).</p>
        <div className={classes.topSection}>
          <div className={classes.filtersWhole}>
            <div className={classes.filtersLabel}>Filters: </div>
            <div className={classes.filtersOnlyContiner}>
              {this.renderFilter({ id: 'Built', name: 'Built'})}
              {this.renderFilter({ id: 'Prebuilt', name: 'Prebuilt'})}
              {this.renderFilter({ id: 'Vintage prebuilt', name: 'Vintage'})}
              {this.renderFilter({ id: 'Unbuilt', name: 'Unbuilt'})}
              {this.renderFilter({ id: 'On the way', name: 'On the way'})}
            </div>
          </div>
          <div className={classes.results}>{builds.filter(x => x.active).length} Results</div>
        </div>
        <div className={classes.cardContainer}>
          {builds
            .map(x => (
              x.loaded &&
              <GridSquare
                className={classnames(!x.active && classes.hide, !x.src.includes('unavailable') && classes.clickable)}
                key={x.id}
                name={x.name}
                description={x.date_bought}
                src={createOptimizedSrc(x.src, { quality: app.config.imageQualityAmp, width: 555 })}
                onClick={() => this.openDialog(x)}
              />
            ))
          }
          {builds.filter(x => x.active).length % 3 === 2 && (<div className={classes.stubBox}></div>)}
          {builds.filter(x => x.active).length === 0 && <div className={classes.noResultsMessage}>Select a filter above to see results.</div>}
        </div>
        <Dialog maxWidth="xl" open={!!openBuild.name}>
          <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
            <Typography variant="h1" component="h6" className={classes.title}>
              {openBuild && openBuild.name}
            </Typography>
            <DialogClose onClick={() => this.closeDialog()} />
          </DialogTitle>
          <DialogContent>
            <div className={classes.dialogImgWrapper}>
              <img className={classes.modalImg} alt={classes.name} src={openBuild && openBuild.src && createOptimizedSrc(openBuild.src, { quality: app.config.imageQuality })} width="1080" />
              <div className={classnames(classes.descriptionBox, openBuild.blank_space || 'bottomRight')}>
                <div><strong>{openBuild.name}</strong></div>
                {this.descriptionize(openBuild)}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    )
  }
}
