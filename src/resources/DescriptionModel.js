import { types } from 'mobx-state-tree'

const DescriptionModel = types.model('DescriptionModel', {
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
})

export default DescriptionModel
