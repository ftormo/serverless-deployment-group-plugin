Serverless Deployment Group
==================================
[![NPM version](https://badge.fury.io/js/serverless.svg)](https://npmjs.org/package/serverless-deployment-group-plugin)
[![node](https://img.shields.io/node/v/serverless-deployment-group-plugin.svg)](https://github.com/ftormo/serverless-deployment-group-plugin)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![codecov](https://codecov.io/gh/ftormo/serverless-deployment-group-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/ftormo/serverless-deployment-group-plugin)
![Node.js CI](https://github.com/ftormo/serverless-deployment-group-plugin/workflows/Node.js%20CI/badge.svg?branch=master)

> Serverless Deployment Group is a plugin that allows to select which functions are to be deployed based on an aggrupation variable.

## Documentation
* [Setup](#setup)
* [Requirements](#requirements)
* [Usage](#usage)
* [License](#license)

## Setup

First, you have to set `serverless-deployment-group-plugin` plugin by running:
```
serverless plugin install --name serverless-deployment-group-plugin
```

This will install the required npm package and add the plugin to your `serverless.yml` file.
```yaml
...

plugins:
  - serverless-deployment-group-plugin

...
```

## Requirements
* Package versions:
  * node: >= 8.0.0
  * npm: >= 1.64.0
  * serverless: >= 1.34

* Warnings:
  * If `deployment-group` option is present in *deploy* command, this plugin removes those *functions* in node *functions* (in *serverless.yml*) which don't match with selected groups.


## Usage

* Add an aggrupation name (`deployment-group`) for one or more functions:
```yaml
...

functions:
  function1:
      deployment-group: group_A
      handler: index.handler
      name: function1

  function2:
      deployment-group: group_A
      handler: index.handler
      name: function1

  function3:
      deployment-group: group_B
      handler: index.handler
      name: function1

...
```

* Run deploy command `sls deploy --deployment-group group_A`.

* Functions will be deployed based on your selection group. In this example: *function1* and *function2*.

## License
  [MIT](LICENSE)