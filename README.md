[![view on npm](https://badgen.net/npm/v/fsm-base)](https://www.npmjs.org/package/fsm-base)
[![npm module downloads](https://badgen.net/npm/dt/fsm-base)](https://www.npmjs.org/package/fsm-base)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/fsm-base)](https://github.com/75lb/fsm-base/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/fsm-base)](https://github.com/75lb/fsm-base/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/fsm-base/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/fsm-base/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# fsm-base

Finite state machine.

Either mix it into an existing object:

```js
import StateMachine from 'fsm-base'

const device = {}
StateMachine.mixInto(device)

device._initStateMachine('offline', [
  { from: 'offline', to: 'connecting' },
  { from: 'connecting', to: 'online' },
  { from: ['connecting', 'online'], to: 'offline' }
])

device.onStateChange = function (state, prevState) {
  console.log(state, prevState)
}

device.state = 'connecting'
device.state = 'connecting' // should not trigger events again
device.state = 'online'
device.state = 'offline' // valid state move
```

..or define a class which extends it:

```js
class Device extends StateMachine {}

const device = new Device()
device._initStateMachine('offline', [
  { from: 'offline', to: 'connecting' },
  { from: 'connecting', to: 'online' },
  { from: ['connecting', 'online'], to: 'offline' }
])

device.onStateChange = function (state, prevState) {
  console.log(state, prevState)
}

device.state = 'connecting'
// etc
```

..or mix it into an existing class that does not `extend` fsm-base.

```js
class Device {}
StateMachine.mixInto(Device)

const device = new Device()
device._initStateMachine('offline', [
  { from: 'offline', to: 'connecting' },
  { from: 'connecting', to: 'online' },
  { from: ['connecting', 'online'], to: 'offline' }
])

device.onStateChange = function (state, prevState) {
  console.log(state, prevState)
}

device.state = 'connecting'
//etc
```

See the [API Documentation](https://github.com/75lb/fsm-base/tree/master/docs/api.md) for more information.

* * *

&copy; 2015-24 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
