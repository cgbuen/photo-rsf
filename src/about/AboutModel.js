import { types } from 'mobx-state-tree'

const AboutModel = types.model('AboutModel', {
  bio: types.maybeNull(types.string),
  link: types.maybeNull(types.string),
})

export default AboutModel
