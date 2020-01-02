import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import AboutModel from './about/AboutModel'
import ContactModel from './contact/ContactModel'
import PhotoModel from './home/PhotoModel'

const AppModel = types.compose(
  AppModelBase,
  types.model('AppModel', {
    about: types.maybeNull(AboutModel),
    contact: types.maybeNull(ContactModel),
    photos: types.array(PhotoModel)
  })
)

export default AppModel
