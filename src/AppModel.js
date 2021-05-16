import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import SocialModel from './SocialModel'
import ConfigModel from './config/ConfigModel'
import ProjectModel from './works/ProjectModel'
import PhotoModel from './photography/PhotoModel'
import BuildModel from './collection/BuildModel'

const AppModel = types.compose(
  AppModelBase,
  types.model('AppModel', {
    config: types.optional(ConfigModel, {}),
    social: types.optional(SocialModel, {}),
    projects: types.optional(types.array(ProjectModel), []),
    photos: types.optional(types.array(PhotoModel), []),
    builds: types.optional(types.array(BuildModel), []),
  })
)

export default AppModel
