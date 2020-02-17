Serverless Deployment Group
==================================
Serverless Deployment Group is a plugin that allows to select which functions are to be deployed based on an aggrupation variable.

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

## Usage

* Add an aggrupation name (`deployment-group`) for one or more function:
```yaml
...

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