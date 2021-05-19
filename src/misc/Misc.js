import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import withStyles from '@material-ui/core/styles/withStyles'
import LinkBlank from '../components/LinkBlank'

@withStyles(
  theme => ({
    list: {
      padding: 0,
      '& > li': {
        marginBottom: 15,
      },
    },
    link: {
      fontSize: 20,
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, social: app.social }))
@observer
export default class Misc extends Component {
  render() {
    const { social, classes } = this.props
    return (
      <Container>
        <Row>
          <Typography variant="h1">Miscellaneous</Typography>
        </Row>
        <p>Links to other resources that don't fall under any of the other categories on this site. Some are not mine, but are just added here for my own personal reference.</p>
        <ul className={classes.list}>
          <li>
            <LinkBlank className={classes.link} to="https://forms.gle/tefHXyEh9WsAJjBs9">Film development/scanning signups</LinkBlank>
            <div>A service I provide to develop and scan your photo film.</div>
          </li>
          <li>
            <LinkBlank className={classes.link} to={social.sffb}>Donation page to the San Francisco-Marin Food Bank</LinkBlank>
            <div>I send all livestream donations (bits / subscriptions) to the SF-Marin Food Bank, but you can also donate here directly.</div>
          </li>
          <li>
            <LinkBlank className={classes.link} to="https://ph-1080.cgbuen.com/mckibbin-son-monograph-series.pdf">The McKibbin & Son Monograph Series</LinkBlank>
            <div>A paper I wrote in 2011 for a typographic history class about a lesser-known, eight-volume monograph series on publishing and typography in the late 1940s.</div>
          </li>
          <li>
            <LinkBlank className={classes.link} to="https://matrixzj.github.io/">Keyset archive</LinkBlank>
            <div>By <LinkBlank to="https://github.com/matrixzj">matrixzj</LinkBlank>. Not by me.</div>
          </li>
          <li>
            <LinkBlank className={classes.link} to="https://drive.google.com/drive/u/0/folders/0B3prVTgFFXASZm1EQkdFbk1JYVk?ths=true">Splatoon 2 map callout guide</LinkBlank>
            <div>By <LinkBlank to="https://twitter.com/im_flc">Imperious flc</LinkBlank>. Not by me.</div>
          </li>
        </ul>
      </Container>
    )
  }
}
