import { types } from 'mobx-state-tree'

const SocialModel = types.model('SocialModel', {
  instagram: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  linkedin: types.maybeNull(types.string),
  twitch: types.maybeNull(types.string),
  twitter: types.maybeNull(types.string),
  github: types.maybeNull(types.string),
  youtube: types.maybeNull(types.string),
  discordP: types.maybeNull(types.string),
  discordC: types.maybeNull(types.string),
})

export default SocialModel 
