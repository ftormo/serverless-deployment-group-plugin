'use strict'

const BbPromise = require('bluebird')
const GROUP_FIELD = 'deployment-group'

class DeploymentGroup {
  constructor (sls, options) {
    this.sls = sls
    this.options = options

    this.commands = {}
    this.hooks = {
      // Initializes plugin.
      'before:package:initialize': () => BbPromise.bind(this)
        .then(() => this.setFunctionsToDeploy())
    }
  }

  setFunctionsToDeploy () {
    if (this.options[GROUP_FIELD]) {
      Object.keys(this.sls.service.functions).forEach(alias => {
        if (this.sls.service.functions[alias][GROUP_FIELD] !== this.options[GROUP_FIELD]) {
          delete this.sls.service.functions[alias]
        }
      })
    }

    if (this.options[GROUP_FIELD] && Object.keys(this.sls.service.functions).length === 0) {
      throw new Error('There aren\'t any function with the \'deployment-group\' specified. Verify it and try again.')
    }
  }
}

module.exports = DeploymentGroup
