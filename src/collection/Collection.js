import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import Card from '../components/Card'
import withStyles from '@material-ui/core/styles/withStyles'
import classnames from 'classnames'

@withStyles(
  theme => ({
    hide: {
      display: 'none',
    },
    topSection: {
      display: 'flex',
      justifyContent: 'space-between',
      '@media (max-width:568px)': {
        alignItems: 'flex-end',
      },
    },
    results: {
      fontWeight: 'bold',
      padding: '5px 0 15px',
      whiteSpace: 'nowrap',
    },
    filtersLabel: {
      display: 'inline-block',
      fontWeight: 'bold',
      marginRight: 15,
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
      padding: '5px 15px',
    },
    filterActive: {
      background: '#69c',
    },
    cardContainer: {
      marginTop: -15,
    },
    noResultsMessage: {
      fontStyle: 'italic',
      marginTop: 30,
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, builds: app.builds, buildFiltersActive: app.buildFiltersActive }))
@observer
export default class Collection extends Component {
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  showable(x) {
    return !x.includes('TBD') && !x.includes('?') && !x.includes('[planned]') && !x.includes('[prop]') && !x.includes('[stock]') && !x.includes('N/A')
  }

  descriptionize(x) {
    return (
      <div>
        <div>Purchased: {x.date_bought}</div>
        {this.showable(x.date_built) && <div>Built: {x.date_built}</div>}
        <div>Color: {x.color}</div>
        {this.showable(x.plate) && <div>Plate: {x.plate}</div>}
        {this.showable(x.switches) && <div>Switches: {x.switches}</div>}
        {this.showable(x.keycaps) && <div>Keycaps: {x.keycaps}</div>}
        {x.notes && (<div>Notes: {x.notes}</div>)}
      </div>
    )
  }

  renderFilter({ id, name }) {
    const { app, classes, builds, buildFiltersActive } = this.props
    return (
      <div className={classnames(classes.filter, buildFiltersActive[id] && classes.filterActive)} onClick={() => app.toggleFilteredBuilds(id)}>
        <div></div>
        <div>{name} ({builds.filter(x => x.assembly_variant.includes('A') && x.build_status === id).length})</div>
      </div>
    )
  }

  render() {
    const { classes, builds } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Keyboard Collection</Typography>
        </Row>
        <p>As a hobby I collect, build, and modify custom / higher-end "mechanical" (computer) keyboards.</p>
        <div className={classes.topSection}>
          <div>
            <div className={classes.filtersLabel}>Filters: </div>
            {this.renderFilter({ id: 'Built', name: 'Built'})}
            {this.renderFilter({ id: 'Prebuilt', name: 'Prebuilt'})}
            {this.renderFilter({ id: 'Vintage prebuilt', name: 'Vintage'})}
            {this.renderFilter({ id: 'Unbuilt', name: 'Unbuilt'})}
            {this.renderFilter({ id: 'On the way', name: 'On the way'})}
          </div>
          <div className={classes.results}>{builds.filter(x => x.active).length} Results</div>
        </div>
        <div className={classes.cardContainer}>
          {builds
            .map(x => (
              x.loaded &&
              <Card
                className={!x.active && classes.hide}
                key={x.id}
                name={x.name}
                src={x.src}
                description={this.descriptionize(x)}
              />
            ))
          }
          {builds.filter(x => x.active).length === 0 && <div className={classes.noResultsMessage}>Select a filter above to see results.</div>}
        </div>
      </Container>
    )
  }
}
