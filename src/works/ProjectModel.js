import { types } from 'mobx-state-tree'

const ProjectModel = types.model('ProjectModel', {
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  src: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
})

export default ProjectModel
