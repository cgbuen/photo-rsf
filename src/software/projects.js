import fetch from 'fetch'

const makeUsableProjectArray = function(array, assetHost) {
  return array
    .map(project => {
      project.src = `${assetHost}/${project.src}.jpg`
      return project
    })
}

export default async function projectGenerator(assetHost) {
  try {
    const projectsResponse = await fetch(`${assetHost}/software.json?${Date.now()}`)
    const projectsResponseJson = await projectsResponse.json()
    return makeUsableProjectArray(projectsResponseJson, assetHost)
  } catch (e) {
    console.error('--> Couldn\'t parse JSON')
    return []
  }
}
