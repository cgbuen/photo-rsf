import { withGlobalState } from 'react-storefront/router'
import Config from 'react-storefront/Config'
import fetch from 'fetch'
import globalState from '../globalState'

const makeUsableProjectArray = function(array, assetHost) {
  return array
    .map(project => {
      project.src = `${assetHost}/projects/${project.src}`
      return project
    })
}

const projectGenerator = async function (assetHost) {
  try {
    const projectsResponse = await fetch(`${assetHost}/projects/projects.json?${Date.now()}`)
    const projectsResponseJson = await projectsResponse.json()
    return makeUsableProjectArray(projectsResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}

export default async function softwareHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: `Projects ${globalState().title}`,
    projects: await projectGenerator(Config.get('assetHost')),
    openProject: {},
  })
}
