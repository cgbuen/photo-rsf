import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import Typography from '@material-ui/core/Typography'
import withAmp from 'react-storefront-extensions/amp/withAmp'
import Card from '../components/Card'
import withStyles from '@material-ui/core/styles/withStyles'
import { createOptimizedSrc } from 'react-storefront/imageService'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogClose from 'react-storefront/DialogClose'

@withStyles(
  theme => ({
    clickable: {
      cursor: 'pointer',
      '@media (max-width:568px)': {
        pointerEvents: 'none',
      },
    },
    modalImg: {
      width: '100%',
    },
  })
)
@withAmp
@inject(({ app }) => ({ app, projects: app.projects, openProject: app.openProject  }))
@observer
export default class Software extends Component {
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  openDialog(project) {
    this.props.app.setOpenProject(project)
  }

  closeDialog() {
    this.props.app.setOpenProject({})
  }

  render() {
    const { app, classes, projects, openProject } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h1">Software & Design Projects</Typography>
        </Row>
        <p>I work as a software engineer / architect for a living, solving fun problems on the web. These are the projects that I've worked on.</p>
        <div>
          {projects.map(x => (
            <Card
              key={x.id}
              name={x.name}
              className={classes.clickable}
              src={createOptimizedSrc(x.src, { quality: app.config.imageQualityAmp, width: 570 })}
              description={x.description}
              onClick={() => this.openDialog(x)}
            />
          ))}
        </div>
        <Dialog maxWidth="md" open={!!openProject.name}>
          <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
            <Typography variant="h1" component="h6" className={classes.title}>
              {openProject && openProject.name}
            </Typography>
            <DialogClose onClick={() => this.closeDialog()} />
          </DialogTitle>
          <DialogContent classes={{ root: classes.dialogContent }}>
            <img className={classes.modalImg} alt={classes.name} src={createOptimizedSrc(openProject.src, { quality: app.config.imageQuality })} />
          </DialogContent>
        </Dialog>
      </Container>
    )
  }
}
