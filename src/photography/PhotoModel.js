import { types } from 'mobx-state-tree'

const PhotoModel = types.model('PhotoModel', {
  id: types.maybeNull(types.number),
  roll: types.maybeNull(types.string),
  number: types.maybeNull(types.union(types.string, types.number)),
  src: types.maybeNull(types.string),
  alt: types.maybeNull(types.string),
  date: types.maybeNull(types.string),
  subject: types.maybeNull(types.string),
  active: types.maybeNull(types.number),
  venue: types.maybeNull(types.string),
  city: types.maybeNull(types.string),
  format: types.maybeNull(types.string),
  film: types.maybeNull(types.string),
  camera: types.maybeNull(types.string),
  cacheBuster: types.maybeNull(types.number),
  comment: types.maybeNull(types.string),
})

export default PhotoModel
