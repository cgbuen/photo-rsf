import { types } from 'mobx-state-tree'

const ConfigModel = types.model('ConfigModel', {
  gaApiKey: types.maybeNull(types.string),
  assetHost: types.maybeNull(types.string),
  imageQuality: types.maybeNull(types.number),
  imageQualityAmp: types.maybeNull(types.number),
  imageQualityThumb: types.maybeNull(types.number),
})

export default ConfigModel
