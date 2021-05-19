import { types } from 'mobx-state-tree'

const BuildFilterModel = types
  .model('BuildFilterModel', {
    Built: types.maybeNull(types.boolean),
    Prebuilt: types.maybeNull(types.boolean),
    'Vintage Prebuilt': types.maybeNull(types.boolean),
    Unbuilt: types.maybeNull(types.boolean),
    'On the way': types.maybeNull(types.boolean),
  })
  .actions(self => ({
    toggle(val) {
      self[val] = !self[val]
    },
  }))

export default BuildFilterModel
