import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import SocialModel from './SocialModel'
import PhotoModel from './home/PhotoModel'

const AppModel = types.compose(
  AppModelBase,
  types.model('AppModel', {
    social: types.maybeNull(SocialModel),
    photos: types.array(PhotoModel)
  })
)

export default AppModel
