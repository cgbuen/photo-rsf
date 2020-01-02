import { types } from 'mobx-state-tree'

const ContactModel = types.model('ContactModel', {
  instagram: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  linkedin: types.maybeNull(types.string),
})

export default ContactModel 
