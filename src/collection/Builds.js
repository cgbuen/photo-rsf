import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import GridSquare from '../components/GridSquare'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import classnames from 'classnames'
import { createOptimizedSrc } from 'react-storefront/imageService'
import LinkBlank from '../components/LinkBlank'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogClose from 'react-storefront/DialogClose'
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp';
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
      marginBottom: 10,
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
    icon: {
      borderRadius: 2,
      display: 'inline-block',
      marginRight: 5,
      overflow: 'hidden',
      position: 'relative',
      verticalAlign: 'middle',
    },
    iconUnchecked: {
      border: '3px solid white',
      display: 'block',
      height: 24,
      width: 24,
    },
    iconChecked: {
      display: 'none',
    },
    filterText: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    filterActive: {
      '& $iconUnchecked': {
        display: 'none'
      },
      '& $iconChecked': {
        background: 'white',
        fill: '#69c',
        display: 'block;'
      },
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
    modalImg: {
      display: 'block',
      width: '100%',
    },
    buildTabsRoot: {
      minHeight: 0,
    },
    buildTabsFlexContainer: {
      display: 'block',
    },
    buildTabRoot: {
      marginRight: 10,
      minHeight: 0,
      minWidth: 0,
    },
    buildTabRootActive: {
      '& $buildTabLabel': {
        textDecorationColor: '#69c',
      },
    },
    buildTabTextColorInherit: {
      opacity: 1,
    },
    buildTabLabelContainer: {
      padding: 0,
    },
    buildTabLabel: {
      textDecoration: 'underline',
      textDecorationColor: 'transparent',
      textDecorationThickness: '2px',
      textTransform: 'none',
      fontWeight: 'bold',
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
    descriptionLink: {
      color: 'white',
      display: 'block',
      fontWeight: 'bold',
      '@media (max-width:925px)': {
        color: '#69c',
      }
    },
    descriptionDetail: {
      textShadow: '1px 1px 1px rgba(64, 64, 64, 0.4)',
    },
    linkContainerWrapper: {
      position: 'relative',
    },
    linkContainer: {
      textShadow: '1px 1px 1px rgba(64, 64, 64, 0.4)',
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
@inject(({ app }) => ({ app, builds: app.builds, buildFiltersActive: app.buildFiltersActive, openBuild: app.openBuild }))
@observer
export default class Builds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variantVal: 0,
      buildDetailsOpen: false,
      dialogImg: ''
    };
  }
  componentDidMount() {
    window.addEventListener('keyup', e => { e.keyCode === 27 && this.closeDialog() })
  }

  handleVariantChange = variants => {
    return (e, v) => {
      this.setState({
        variantVal: v,
        dialogImg: variants[v].src
      })
    }
  }

  handleBuildDetailsOpen = (val) => {
    return () => {
      this.setState({ buildDetailsOpen: val })
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
    if (x.build_video) {
      links.push(
        <LinkBlank className={classes.descriptionLink} to={x.build_video} onClick={() => this.modalIconClick({name: x.name, iconType: 'build'})}>
          <Build className={classes.featureIcon} />
          Build video
        </LinkBlank>
      )
    }
    if (x.type_test) {
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
    if (!x === 'Built' || x.assembly_variant === 'A0') {
      return this.descriptionizeIndividual(x)
    } else {
      const { builds, classes } = this.props
      const { variantVal } = this.state
      const variants = builds.filter(y => y.board_id === x.board_id)
      return (
        <>
          <Tabs
            classes={{
              root: classes.buildTabsRoot,
              flexContainer: classes.buildTabsFlexContainer,
            }}
            variant="fullWidth"
            onChange={this.handleVariantChange(variants)}
          >
            {variants.map((y, i) => (
              <Tab
                classes={{
                  root: classnames({
                    [classes.buildTabRoot]: true,
                    [classes.buildTabRootActive]: i === variantVal,
                  }),
                  textColorInherit: classes.buildTabTextColorInherit,
                  labelContainer: classes.buildTabLabelContainer,
                  label: classes.buildTabLabel,
                }}
                key={i}
                label={`Build ${i+1}`}
              />
            ))}
          </Tabs>
          <div>
            {variants.map((y, i) => i === variantVal && <div key={i}>{this.descriptionizeIndividual(y, { variant: true })}</div>)}
          </div>
        </>
      )
    }
  }

  renderDetailKeycaps(x) {
    const { classes } = this.props
    if (this.showable(x.keycaps)) {
      let val = `Current keyset: ${x.keycaps}`
      if (['(back)', '(none)'].includes(x.pictured)) {
        val += ` (not pictured)`
      } else if (this.showable(x.pictured) && x.keycaps !== x.pictured) {
        val += ` (pictured here with ${x.pictured})`
      }
      return <div className={classes.descriptionDetail}>{val}</div>
    } else if (this.showable(x.pictured)) {
      return <div className={classes.descriptionDetail}>Pictured keyset: {x.pictured}</div>
    }
  }

  descriptionizeIndividual(x, options={}) {
    const { classes } = this.props
    return (
      <div className={classes.descriptionColumnWrapper}>
        <div className={classes.descriptionColumn}>
          {options.variant && x.build_status !== 'Built' && <div className={classes.descriptionDetail}>(Unbuilt)</div>}
          <div className={classes.descriptionDetail}>Purchased: {x.date_bought}</div>
          {this.showable(x.date_built) && <div className={classes.descriptionDetail}>{x.build_status === 'Built' ? 'Built' : 'Modified'}: {x.date_built} {this.showable(x.date_built_init) && x.date_built !== x.date_built_init ? `(initially ${x.date_built_init})` : ''}</div>}
          <div className={classes.descriptionDetail}>Color: {x.color}</div>
          {this.showable(x.layout) && !['60% HHKB 7u', '60% HHKB 6u'].includes(x.layout) && <div className={classes.descriptionDetail}>Layout: {x.layout}</div>}
          {this.showable(x.mount) && <div className={classes.descriptionDetail}>Mounting Style: {x.mount} {this.showable(x.pcb_thickness) && x.pcb_thickness !== '1.6mm' ? `(${x.pcb_thickness} PCB)` : ''}</div>}
        </div>
        <div className={classes.descriptionColumn}>
          {this.showable(x.plate) && <div className={classes.descriptionDetail}>Plate: {x.plate}</div>}
          {this.showable(x.stabilizers) && <div className={classes.descriptionDetail}>Stabilizers: {x.stabilizers}</div>}
          {this.showable(x.switches) && <div className={classes.descriptionDetail}>Switches: {x.switches}</div>}
          {this.renderDetailKeycaps(x)}
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
      <Track key={id} event="filterClick" name={name} filterStatus={`${!buildFiltersActive[id]}`}>
        <div className={classnames(classes.filter, buildFiltersActive[id] && classes.filterActive)} onClick={() => app.toggleFilteredBuilds(id)}>
          <div className={classes.icon}>
            <div className={classes.iconUnchecked}></div>
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
      this.setState({ dialogImg: build.src })
    }
  }

  closeDialog() {
    this.props.app.setOpenBuild({})
    this.setState({
      variantVal: 0,
      buildDetailsOpen: false,
      dialogImg: '',
    })
  }

  determineDate(x) {
    if (['TBD', 'N/A'].includes(x.date_built)) {
      return `Purchased ${x.date_bought}`
    } else if (x.build_status === 'Built') {
      return `Built ${x.date_built}`
    } else {
      return `Modified ${x.date_built}`
    }
  }

  render() {
    const { app, classes, builds, openBuild } = this.props
    const { buildDetailsOpen } = this.state

    return (
      <>
        <div className={classes.topSection}>
          <div className={classes.filtersWhole}>
            <div className={classes.filtersLabel}>Filters: </div>
            <div className={classes.filtersOnlyContiner}>
              {
                ['Built', 'Prebuilt', 'Vintage', 'Unbuilt', 'On the way']
                  .filter(x => builds.filter(y => y.build_status === x && y.assembly_variant.includes('A')).length > 0)
                  .map(x => this.renderFilter({ id: x, name: x }))
              }
            </div>
          </div>
          <div className={classes.results}>{builds.filter(x => x.displayed).length} Results</div>
        </div>
        <div className={classes.cardContainer}>
          {builds
            .map(x => {
              let src = x.src
              if (!x.active && x.assembly_variant === 'A') {
                const active = builds.filter(y => y.board_id === x.board_id && y.active)
                src = active[0].src
              }
              return x.loaded && (
                <Track key={x.id} event="keyboardClick" name={x.name}>
                  <GridSquare
                    className={classnames(!x.displayed && classes.hide, !(x.src.includes('unavailable') || x.otw_link) && classes.clickable)}
                    key={x.id}
                    name={x.name}
                    description={this.determineDate(x)}
                    src={createOptimizedSrc(src, { quality: app.config.imageQualityAmp, width: 555 })}
                    onClick={() => this.openDialog(x)}
                  />
                </Track>
              )
            })
          }
          {builds.filter(x => x.displayed).length % 3 === 2 && (<div className={classes.stubBox}></div>)}
          {builds.filter(x => x.displayed).length === 0 && <div className={classes.noResultsMessage}>Select a filter above to see results.</div>}
        </div>
        <Dialog maxWidth="xl" open={!!openBuild.name}>
          <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
            <Typography variant="h1" component="h6" className={classes.title}>
              {openBuild &&
                <>
                  <span className={classes.dialogInnerTitle}>{openBuild.name}</span>
                  <span className={classes.expand} onClick={this.handleBuildDetailsOpen(!buildDetailsOpen)}>
                    <span className={classes.highlight}>[</span>
                      {buildDetailsOpen ? <>&ndash; hide</> : '+ show'} build details
                    <span className={classes.highlight}>]</span>
                  </span>
                </>
              }
            </Typography>
            <DialogClose onClick={() => this.closeDialog()} />
          </DialogTitle>
          <DialogContent>
            <div className={classes.dialogImgWrapper}>
              <img className={classes.modalImg} alt={classes.name} src={createOptimizedSrc(this.state.dialogImg, { quality: app.config.imageQuality })} width="1080" />
              {
                buildDetailsOpen && (
                  <div className={classes.descriptionBox}>
                    {this.descriptionize(openBuild)}
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
