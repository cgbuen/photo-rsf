import { types } from 'mobx-state-tree'

const KeysetModel = types
  .model('KeysetModel', {
    id: types.maybeNull(types.number),
    mount: types.maybeNull(types.string),
    keyset: types.maybeNull(types.string),
    purchase_date: types.maybeNull(types.string),
    purchase_status: types.maybeNull(types.string),
    src: types.maybeNull(types.string),
    keyboard: types.maybeNull(types.string),
    plan: types.maybeNull(types.string),
    pictured: types.maybeNull(types.string),
    tkl_only: types.maybeNull(types.number),
    category: types.maybeNull(types.string),
    color: types.maybeNull(types.string),
    mount_status: types.maybeNull(types.string),
    notes: types.maybeNull(types.string),
  })
  .actions(self => ({
  }))

export default KeysetModel
