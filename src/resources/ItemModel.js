import { types } from 'mobx-state-tree'

const ItemModel = types.model('ItemModel', {
  id: types.maybeNull(types.number),
  active: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  kind: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  notes: types.maybeNull(types.string),
})

export default ItemModel
