/* eslint-env mocha */
var expect = require('chai').expect
var DeploymentGroup = require('../index')

describe('#package()', () => {
  let sls = {}

  beforeEach(() => {
    sls = {
      service: {
        functions: {
          example1: {
            'deployment-group': 'test1'
          },
          example2: {
            'deployment-group': 'test2'
          }
        }
      }
    }
  })

  it('should have hook', () => {
    const deploymentGroup = new DeploymentGroup(sls, {})

    expect(deploymentGroup.hooks).to.have.nested.property('before:package:initialize')
    deploymentGroup.hooks['before:package:initialize']()
    expect(deploymentGroup.sls).to.deep.include(sls)
  })

  it('not deployment-group option', () => {
    const deploymentGroup = new DeploymentGroup(sls, {})
    deploymentGroup.setFunctionsToDeploy()

    expect(deploymentGroup.sls).to.deep.include(sls)
  })

  it('set deployment-group option with matching one group', () => {
    const deploymentGroup = new DeploymentGroup(sls, {
      'deployment-group': 'test2'
    })
    deploymentGroup.setFunctionsToDeploy()

    expect(deploymentGroup.sls).to.not.have.nested.property('service.functions.example1')
    expect(deploymentGroup.sls).to.have.nested.property('service.functions.example2')
  })

  it('set deployment-group option with matching all groups', () => {
    const deploymentGroup = new DeploymentGroup(sls, {
      'deployment-group': 'test1,test2'
    })
    deploymentGroup.setFunctionsToDeploy()

    expect(deploymentGroup.sls).to.have.nested.property('service.functions.example1')
    expect(deploymentGroup.sls).to.have.nested.property('service.functions.example2')
  })

  it('set deployment-group option without matching groups', () => {
    const deploymentGroup = new DeploymentGroup(sls, {
      'deployment-group': 'test'
    })
    let notResourcesException = false

    try {
      deploymentGroup.setFunctionsToDeploy()
    } catch (e) {
      notResourcesException = true
    } finally {
      expect(deploymentGroup.sls).to.not.have.nested.property('service.functions.example1')
      expect(deploymentGroup.sls).to.not.have.nested.property('service.functions.example2')
      expect(notResourcesException).to.be.equal(true)
    }
  })
})
