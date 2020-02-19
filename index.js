'use strict'

const GROUP_FIELD = 'deployment-group'

class DeploymentGroup {
  constructor (sls, options) {
    this.sls = sls
    this.options = options

    this.commands = {}
    this.hooks = {
      // Initializes plugin.
      'before:package:initialize': () => this.setFunctionsToDeploy.bind(this)
    }
  }

  setFunctionsToDeploy () {
    if (this.options[GROUP_FIELD]) {
      const groups = this.options[GROUP_FIELD].split(',')
      Object.keys(this.sls.service.functions).forEach(alias => {
        if (groups.indexOf(this.sls.service.functions[alias][GROUP_FIELD]) === -1) {
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
