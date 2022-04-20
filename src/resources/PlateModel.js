import { types } from 'mobx-state-tree'

const PlateModel = types.model('PlateModel', {
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  src: types.maybeNull(types.string),
  kerf: types.maybeNull(types.number),
  cache_buster: types.maybeNull(types.number),
  notes: types.maybeNull(types.string),
})

export default PlateModel
