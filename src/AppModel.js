import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import SocialModel from './SocialModel'
import ConfigModel from './config/ConfigModel'
import ProjectModel from './projects/ProjectModel'
import PhotoModel from './photography/PhotoModel'
import LinkModel from './misc/LinkModel'
import BuildModel from './collection/BuildModel'
import BuildFilterModel from './collection/BuildFilterModel'

const AppModel = types.compose(
  AppModelBase,
  types
    .model('AppModel', {
      config: types.optional(ConfigModel, {}),
      social: types.optional(SocialModel, {}),
      projects: types.optional(types.array(ProjectModel), []),
      photos: types.optional(types.array(PhotoModel), []),
      links: types.optional(types.array(LinkModel), []),
      builds: types.optional(types.array(BuildModel), []),
      buildFiltersActive: types.optional(BuildFilterModel, {}),
      openBuild: types.optional(BuildModel, {}),
      openProject: types.optional(ProjectModel, {}),
    })
    .actions(self => ({
      toggleFilteredBuilds(val) {
        self.builds = self.builds.map(x => {
          if (x.assembly_variant.includes('A') && x.build_status === val) {
            x.setLoaded(true)
            x.setActive(!x.active)
          }
          return x
        })
        self.buildFiltersActive.toggle(val)
      },
      setOpenBuild(build) {
        self.openBuild = {...build}
      },
      setOpenProject(project) {
        self.openProject = {...project}
      },
    }))
)

export default AppModel
