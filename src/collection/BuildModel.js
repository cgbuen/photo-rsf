import { types } from 'mobx-state-tree'

const BuildModel = types
  .model('BuildModel', {
    id: types.maybeNull(types.number),
    name: types.maybeNull(types.string),
    src: types.maybeNull(types.string),
    build_status: types.maybeNull(types.string),
    date_bought: types.maybeNull(types.string),
    date_built: types.maybeNull(types.string),
    notes: types.maybeNull(types.string),
    assembly_variant: types.maybeNull(types.string),
    color: types.maybeNull(types.string),
    layout: types.maybeNull(types.string),
    pcb: types.maybeNull(types.string),
    plate: types.maybeNull(types.string),
    switches: types.maybeNull(types.string),
    keycaps: types.maybeNull(types.string),
    active: types.maybeNull(types.boolean),
    loaded: types.maybeNull(types.boolean),
  })
  .actions(self => ({
    setActive(val) {
      self.active = val
    },
    setLoaded(val) {
      self.loaded = val
    }
  }))

export default BuildModel
