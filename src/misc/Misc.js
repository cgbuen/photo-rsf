import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import LinkBlank from '../components/LinkBlank'

@withAmp
@inject(({ app }) => ({ app }))
@observer
export default class Misc extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Typography variant="h1">Miscellaneous</Typography>
        </Row>
        <p>Links to other resources that don't fall under any of the other categories on this site. Some are not mine, but are just added here for my own personal reference.</p>
        <ul>
          <li><LinkBlank to="https://forms.gle/tefHXyEh9WsAJjBs9">Film development/scanning signups</LinkBlank>: A service I provide to develop and scan your photo film.</li>
          <li><LinkBlank to="https://us-p2p.netdonor.net/1803/general/61375/cgbuen">Donation page to the San Francisco-Marin Food Bank</LinkBlank>: I send all livestream donations (bits / subscriptions) to the SF-Marin Food Bank, but you can also donate here directly.</li>
          <li><LinkBlank to="https://matrixzj.github.io/">Keyset archive</LinkBlank> by <LinkBlank to="https://github.com/matrixzj">matrixzj</LinkBlank></li>
          <li><LinkBlank to="https://drive.google.com/drive/u/0/folders/0B3prVTgFFXASZm1EQkdFbk1JYVk?ths=true">Splatoon 2 map callout guide</LinkBlank> by <LinkBlank to="https://twitter.com/im_flc">Imperious flc</LinkBlank></li>
        </ul>
      </Container>
    )
  }
}
