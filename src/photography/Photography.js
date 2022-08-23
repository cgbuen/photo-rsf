import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Gallery from '../components/react-photo-gallery/Gallery'
import Image from './Image'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@withAmp
@inject(({ app }) => ({ app, photos: app.photos }))
@observer
export default class Photography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandscape: false,
      enableMouseEvents: false,
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
    this.setState({ isLandscape: window.innerWidth > window.innerHeight, enableMouseEvents: window.innerWidth < 645 })
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

  imageRenderer({ index, photo, direction, top, left, key }) {
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
      />
    )
  }

  render() {
    const { photos } = this.props
    const { enableMouseEvents } = this.state

    return (
      <Container>
        <Row>
          <Typography variant="h1">Concert Photography</Typography>
        </Row>
        <p>Here are a few live music events that I'm lucky to have shot. {enableMouseEvents ? "Tap" : "Click"} each image for more info.</p>
        <Gallery
          photos={photos.slice(0, 2)}
          direction={enableMouseEvents ? "column" : "row"}
          columns={this.columnsATF}
          renderImage={this.imageRenderer}
          onClick={this.showInfo}
        />
        <Gallery
          photos={photos.slice(2, 7)}
          direction={enableMouseEvents ? "column" : "row"}
          columns={this.columnsATF}
          renderImage={this.imageRenderer}
          onClick={this.showInfo}
        />
        <Gallery
          photos={photos.slice(7)}
          direction={"column"}
          columns={this.columnsBTF}
          renderImage={this.imageRenderer}
          onClick={this.showInfo}
        />
      </Container>
    )
  }
}
