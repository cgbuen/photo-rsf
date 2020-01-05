import { types } from 'mobx-state-tree'

const ConfigModel = types.model('ConfigModel', {
  gaApiKey: types.maybeNull(types.string),
})

export default ConfigModel
