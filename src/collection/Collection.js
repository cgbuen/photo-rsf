import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import classnames from 'classnames'
import LinkBlank from '../components/LinkBlank'
import Builds from './Builds'
import Keysets from './Keysets'

@withStyles(
  theme => ({
    blurb: {
      marginBottom: 20,
    },
    collectionTabsRoot: {
      marginBottom: 20,
      minHeight: 0,
    },
    collectionTabsFlexContainer: {
      display: 'block',
    },
    collectionTabsScroller: {
      borderBottom: '3px solid #69c',
    },
    collectionTabRoot: {
      marginRight: 10,
      minHeight: 0,
      minWidth: 0,
    },
    collectionTabRootActive: {
      background: '#69c',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    collectionTabTextColorInherit: {
      opacity: 1,
    },
    collectionTabLabelContainer: {
    },
    collectionTabLabel: {
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 18,
    },
  })
)
@withAmp
@inject(({ app, history }) => ({ app, history, location: app.location, social: app.social, }))
@observer
export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionVal: 0,
    };
  }
  componentDidMount() {
    const { history, location } = this.props
    if (location.pathname.match(/\/collection\/.+/)) {
      history.replace('/collection')
    }
  }

  handleSectionChange = (e, v) => {
    this.setState({ sectionVal: v })
  }

  render() {
    const { social, classes } = this.props
      const { sectionVal } = this.state

    return (
      <Container>
        <Row>
          <Typography variant="h1">Keyboard Collection</Typography>
        </Row>
        <p className={classes.blurb}>Below is my personal collection of computer keyboards (primarily in HHKB-inspired layouts) and accompanying keysets. I stream my build process to <LinkBlank to={social.twitch}>Twitch</LinkBlank>.</p>
        <Tabs
          classes={{
            root: classes.collectionTabsRoot,
            flexContainer: classes.collectionTabsFlexContainer,
            scroller: classes.collectionTabsScroller,
          }}
          variant="fullWidth"
          onChange={this.handleSectionChange}
        >
          {['Keyboards', 'Keysets'].map((y, i) => (
            <Tab
              classes={{
                root: classnames({
                  [classes.collectionTabRoot]: true,
                  [classes.collectionTabRootActive]: i === sectionVal,
                }),
                textColorInherit: classes.collectionTabTextColorInherit,
                labelContainer: classes.collectionTabLabelContainer,
                label: classes.collectionTabLabel,
              }}
              key={i}
              label={y}
            />
          ))}
        </Tabs>
        <div>
          {0 === sectionVal && <Builds />}
          {1 === sectionVal && <Keysets />}
        </div>
      </Container>
    )
  }
}
