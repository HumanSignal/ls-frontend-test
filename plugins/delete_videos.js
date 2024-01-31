import {deleteAsync} from "del"

/**
  * Delets recorded video if the spec was successful
  *
  * @param {Cypress.PluginEvents} on Event handler
  * @param {Cypress.PluginConfigOptions} _config Plugin configuration
  * @returns {void}
  */
export function deleteVideos(on, _config) {
  on("after:spec", (_, result) => {
    if (result.stats.failures === 0 && result.video) {
      return deleteAsync(result.video)
    }
  })
}
