import { types } from 'mobx-state-tree'
import AppModelBase from 'react-storefront/model/AppModelBase'
import AboutModel from './about/AboutModel'
import ContactModel from './contact/ContactModel'

const AppModel = types.compose(
  AppModelBase,
  types.model('AppModel', {
    about: types.maybeNull(AboutModel),
    contact: types.maybeNull(ContactModel),
  })
)

export default AppModel
