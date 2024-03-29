import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { SRLWrapper } from "simple-react-lightbox"
import Gallery from '../components/react-photo-gallery/Gallery'
import Image from './Image'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'

const srlOptions = {
  settings: {
    disableWheelControls: true,
    disablePanzoom: true,
    lightboxTransitionSpeed: .2,
    lightboxTransitionTimingFunction: 'easeIn',
    transitionSpeed: .2,
    transitionTimingFunction: 'easeIn',
    slideTransitionSpeed: .2,
    slideTransitionTimingFunction: 'easeIn',
  },
  buttons: {
    backgroundColor: 'rgba(0, 0, 0, .55)',
    showDownloadButton: false,
    showAutoplayButton: false,
    showFullscreenButton: false,
  },
  caption: {
    captionContainerPadding: '0 0 50px',
  },
  thumbnails: {
    showThumbnails: false,
  }
}

@withAmp
@inject(({ app }) => ({ app, photos: app.photos }))
@observer
export default class Photography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandscape: false,
      isMobile: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ isLandscape: window.innerWidth > window.innerHeight, isMobile: window.innerWidth < 645 })
  }

  columnsATF(containerWidth) {
    let columns = 1;
    if (containerWidth >= 645) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  }

  columnsBTF(containerWidth) {
    let columns = 1;
    if (containerWidth >= 600) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  }

  imageRenderer(isMobile) {
    return ({ index, photo, direction, top, left, key }) => {
      return (
        <Image
          key={key}
          index={index}
          photo={photo}
          direction={direction}
          top={top}
          left={left}
          margin={2}
          descriptionVisible={false}
          isMobile={isMobile}
        />
      )
    }
  }

  render() {
    const { photos } = this.props
    const { isMobile } = this.state

    const Page = (
      <>
        <Row>
          <Typography variant="h1">Concert Photography</Typography>
        </Row>
        <p>Here are a few live music events that I'm lucky to have shot. {isMobile ? "Tap" : "Click"} each image for more info.</p>
        <Gallery
          photos={photos.slice(0, 2)}
          direction={isMobile ? "column" : "row"}
          columns={this.columnsATF}
          renderImage={this.imageRenderer(isMobile)}
        />
        <Gallery
          photos={photos.slice(2, 7)}
          direction={isMobile ? "column" : "row"}
          columns={this.columnsATF}
          renderImage={this.imageRenderer(isMobile)}
        />
        <Gallery
          photos={photos.slice(7)}
          direction={"column"}
          columns={this.columnsBTF}
          renderImage={this.imageRenderer(isMobile)}
        />
      </>
    )

    return (
      <Container>
        {isMobile ? Page : <SRLWrapper options={srlOptions}>{Page}</SRLWrapper>}
      </Container>
    )
  }
}
