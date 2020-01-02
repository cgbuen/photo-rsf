import { types } from 'mobx-state-tree'

const ContactModel = types.model('ContactModel', {
  instagram: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  linkedin: types.maybeNull(types.string),
  twitch: types.maybeNull(types.string),
  twitter: types.maybeNull(types.string),
  github: types.maybeNull(types.string),
  website: types.maybeNull(types.string),
})

export default ContactModel 