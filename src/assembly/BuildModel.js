import { types } from 'mobx-state-tree'

const BuildModel = types.model('BuildModel', {
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  src: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
})

export default BuildModel
