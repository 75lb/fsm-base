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

<a name="module_fsm-base"></a>

## fsm-base

* [fsm-base](#module_fsm-base)
    * [StateMachine](#exp_module_fsm-base--StateMachine) ⏏
        * _instance_
            * [.state](#module_fsm-base--StateMachine+state) : <code>string</code>
            * [._initStateMachine(initialState, validMoves)](#module_fsm-base--StateMachine+_initStateMachine)
            * [.onStateChange(state, prevState)](#module_fsm-base--StateMachine+onStateChange)
            * [.resetState()](#module_fsm-base--StateMachine+resetState)
        * _static_
            * [.mixInto(target)](#module_fsm-base--StateMachine.mixInto)

<a name="exp_module_fsm-base--StateMachine"></a>

### StateMachine ⏏
**Kind**: Exported class  
<a name="module_fsm-base--StateMachine+state"></a>

#### stateMachine.state : <code>string</code>
The current state

**Kind**: instance property of [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  
**Throws**:

- `INVALID_MOVE` if an invalid move made

<a name="module_fsm-base--StateMachine+_initStateMachine"></a>

#### stateMachine.\_initStateMachine(initialState, validMoves)
**Kind**: instance method of [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  

| Param | Type | Description |
| --- | --- | --- |
| initialState | <code>string</code> | Initial state, e.g. 'pending'. |
| validMoves | <code>Array.&lt;object&gt;</code> | Array of valid move rules. |

<a name="module_fsm-base--StateMachine+onStateChange"></a>

#### stateMachine.onStateChange(state, prevState)
Invoked on every state change

**Kind**: instance method of [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | the new state |
| prevState | <code>string</code> | the previous state |

<a name="module_fsm-base--StateMachine+resetState"></a>

#### stateMachine.resetState()
Reset to initial state.

**Kind**: instance method of [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  
<a name="module_fsm-base--StateMachine.mixInto"></a>

#### StateMachine.mixInto(target)
**Kind**: static method of [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | The target class (or constructor function) to receive the state machine behaviour. |


* * *

&copy; 2015-24 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
