import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import SocialModel from './SocialModel'
import ConfigModel from './config/ConfigModel'
import PhotoModel from './home/PhotoModel'

const AppModel = types.compose(
  AppModelBase,
  types.model('AppModel', {
    config: types.optional(ConfigModel, {}),
    social: types.optional(SocialModel, {}),
    photos: types.optional(types.array(PhotoModel), [])
  })
)

export default AppModel
