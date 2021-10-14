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
import Instagram from '../assets/instagram.svg'
import Build from '@material-ui/icons/Build'
import Sound from '@material-ui/icons/VolumeUp'
import Track from 'react-storefront/Track'
import analytics from 'react-storefront/analytics'

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
    descriptionTitle: {
      textShadow: '1px 1px 1px rgba(128, 128, 128, 0.5)',
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
      display: 'block',
      fontWeight: 'bold',
      '@media (max-width:925px)': {
        color: '#69c',
      }
    },
    descriptionDetail: {
      textShadow: '1px 1px 1px rgba(128, 128, 128, 0.5)',
    },
    linkContainerWrapper: {
      position: 'relative',
    },
    linkContainer: {
      textShadow: '1px 1px 1px rgba(128, 128, 128, 0.5)',
      '& $descriptionLink': {
        textDecoration: 'none',
      },
      '@media (max-width:925px)': {
        textShadow: 'none',
       },
    },
    featureIcon: {
      fill: '#69c',
      filter: 'drop-shadow(2px 1px 1px rgba(255, 255, 255, .3))',
      display: 'inline-block',
      height: 16,
      marginRight: 5,
      verticalAlign: 'middle',
      width: 16,
      '@media (max-width:925px)': {
        filter: 'none',
      },
    },
    linkContainerCheat: {
      left: 0,
      position: 'absolute',
      textShadow: 'none',
      top: 0,
      '& $featureIcon': {
        visibility: 'hidden',
      },
      '& $descriptionLink': {
        color: 'transparent',
        textDecoration: 'underline',
        textDecorationColor: '#69c',
        textDecorationThickness: '2px',
        '@media (max-width:925px)': {
          textDecorationThickness: '1px',
        },
      },
    },
  })
)
@withAmp
@inject(({ app, history }) => ({ app, history, location: app.location, social: app.social, builds: app.builds, buildFiltersActive: app.buildFiltersActive, openBuild: app.openBuild }))
@observer
export default class Collection extends Component {
  componentDidMount() {
    const { history, location } = this.props
    if (location.pathname.match(/\/collection\/.+/)) {
      history.replace('/collection')
    }
  }

  showable(x) {
    return x && !x.includes('TBD') && !x.includes('?') && !x.includes('[planned]') && !x.includes('[prop]') && !x.includes('[stock]') && !x.includes('Stock') && !x.includes('N/A')
  }

  modalIconClick(x) {
    analytics.modalIconClick(x)
  }

  buildLinks(x, cheat) {
    const { classes } = this.props
    const links = []
    if (x.build_video && !x.type_test) {
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.build_video} onClick={() => this.modalIconClick({name: x.name, iconType: 'build'})}>Build video</LinkBlank>
      )
    } else if (x.build_video && x.type_test && x.type_test.includes(x.build_video)) {
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.build_video} onClick={() => this.modalIconClick({name: x.name, iconType: 'build'})}>
          <Build className={classes.featureIcon} />
          Build video
        </LinkBlank>
      )
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.type_test} onClick={() => this.modalIconClick({name: x.name, iconType: 'type test'})}>
          <Sound className={classes.featureIcon} />
          Type test (timestamped)
        </LinkBlank>)
    } else if (x.build_video && x.type_test && !x.type_test.includes(x.build_video)) {
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.build_video} onClick={() => this.modalIconClick({name: x.name, iconType: 'build'})}>
          <Build className={classes.featureIcon} />
          Build video
        </LinkBlank>
      )
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.type_test} onClick={() => this.modalIconClick({name: x.name, iconType: 'type test'})}>
          <Sound className={classes.featureIcon} />
          Type test
        </LinkBlank>
      )
    } else if (!x.build_video && x.type_test) {
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.type_test} onClick={() => this.modalIconClick({name: x.name, iconType: 'type test'})}>
          <Sound className={classes.featureIcon} />
          Type test
        </LinkBlank>
      )
    }
    if (this.showable(x.instagram)) {
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.instagram} onClick={() => this.modalIconClick({name: x.name, iconType: 'instagram'})}>
          <Instagram className={classes.featureIcon} />
          Instagram post
        </LinkBlank>
      )
    }
    return (
      <div className={classnames(classes.linkContainer, cheat && classes.linkContainerCheat)}>
        {links.map((y, i) => (<div key={i}>{y}</div>))}
      </div>
    )
  }

  descriptionize(x) {
    const { classes } = this.props
    return (
      <div className={classes.descriptionColumnWrapper}>
        <div className={classes.descriptionColumn}>
          <div className={classes.descriptionDetail}>Purchased: {x.date_bought}</div>
          {this.showable(x.date_built) && <div className={classes.descriptionDetail}>Built: {x.date_built}</div>}
          <div className={classes.descriptionDetail}>Color: {x.color}</div>
          {this.showable(x.mount) && <div className={classes.descriptionDetail}>Layout: {x.layout}</div>}
          {this.showable(x.mount) && <div className={classes.descriptionDetail}>Mounting Style: {x.mount} mount</div>}
          {this.showable(x.plate) && <div className={classes.descriptionDetail}>Plate: {x.plate}</div>}
        </div>
        <div className={classes.descriptionColumn}>
          {this.showable(x.switches) && <div className={classes.descriptionDetail}>Switches: {x.switches}</div>}
          {this.showable(x.keycaps) && <div className={classes.descriptionDetail}>Keycaps: {x.keycaps}</div>}
          {x.notes && (<div className={classes.descriptionDetail}>Notes: {x.notes}</div>)}
          <div className={classes.linkContainerWrapper}>
            {this.buildLinks(x, false)}
            {this.buildLinks(x, true)}
          </div>
        </div>
      </div>
    )
  }

  renderFilter({ id, name }) {
    const { app, classes, builds, buildFiltersActive } = this.props
    return (
      <Track event="filterClick" name={name} filterStatus={`${!buildFiltersActive[id]}`}>
        <div className={classnames(classes.filter, buildFiltersActive[id] && classes.filterActive)} onClick={() => app.toggleFilteredBuilds(id)}>
          <div className={classes.icon}>
            <CheckBoxOutlineBlankSharpIcon className={classes.iconUnchecked} />
            <CheckBoxSharpIcon className={classes.iconChecked} />
          </div>
          <div className={classes.filterText}>{name} ({builds.filter(x => x.assembly_variant.includes('A') && x.build_status === id).length})</div>
        </div>
      </Track>
    )
  }

  openDialog(build) {
    if (!(build.src.includes('unavailable') || build.otw_link)) {
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
        <p className={classes.blurb}>I collect computer keyboards and stream my build process to <LinkBlank to={social.twitch}>Twitch</LinkBlank>. Below is my personal collection, which is primarily comprised of keyboards with HHKB-inspired layouts (compact 60% US ANSI with split backspace, split right shift, and bottom corner blockers).</p>
        <div className={classes.topSection}>
          <div className={classes.filtersWhole}>
            <div className={classes.filtersLabel}>Filters: </div>
            <div className={classes.filtersOnlyContiner}>
              {this.renderFilter({ id: 'Built', name: 'Built'})}
              {this.renderFilter({ id: 'Prebuilt', name: 'Prebuilt'})}
              {this.renderFilter({ id: 'Vintage', name: 'Vintage'})}
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
              <Track key={x.id} event="keyboardClick" name={x.name}>
                <GridSquare
                  className={classnames(!x.active && classes.hide, !(x.src.includes('unavailable') || x.otw_link) && classes.clickable)}
                  key={x.id}
                  name={x.name}
                  description={['TBD', 'N/A'].includes(x.date_built) ? x.date_bought : x.date_built}
                  instagram={x.instagram}
                  buildVideo={x.build_video}
                  typeTest={x.type_test}
                  src={createOptimizedSrc(x.src, { quality: app.config.imageQualityAmp, width: 555 })}
                  onClick={() => this.openDialog(x)}
                />
              </Track>
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
                <div className={classes.descriptionTitle}><strong>{openBuild.name}.</strong></div>
                {this.descriptionize(openBuild)}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    )
  }
}
