import { types } from 'mobx-state-tree'

const LinkModel = types.model('LinkModel', {
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  src: types.maybeNull(types.string),
  cache_buster: types.maybeNull(types.number),
  href: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  author_link: types.maybeNull(types.string),
  author_name: types.maybeNull(types.string),
})

export default LinkModel
