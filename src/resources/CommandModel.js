import { types } from 'mobx-state-tree'

const CommandModel = types.model('CommandModel', {
  id: types.maybeNull(types.number),
  command: types.maybeNull(types.string),
  aliases: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  href: types.maybeNull(types.string),
})

export default CommandModel
