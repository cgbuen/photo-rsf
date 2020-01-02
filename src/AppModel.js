import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import ContactModel from './contact/ContactModel'
import PhotoModel from './home/PhotoModel'

const AppModel = types.compose(
  AppModelBase,
  types.model('AppModel', {
    contact: types.maybeNull(ContactModel),
    photos: types.array(PhotoModel)
  })
)

export default AppModel
