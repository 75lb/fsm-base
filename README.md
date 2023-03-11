[![view on npm](https://badgen.net/npm/v/fsm-base)](https://www.npmjs.org/package/fsm-base)
[![npm module downloads](https://badgen.net/npm/dt/fsm-base)](https://www.npmjs.org/package/fsm-base)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/fsm-base)](https://github.com/75lb/fsm-base/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/fsm-base)](https://github.com/75lb/fsm-base/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/fsm-base/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/fsm-base/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# fsm-base

```js
const StateMachine = require('fsm-base')

class Stateful extends StateMachine {
  constructor () {
    super([
      { from: undefined, to: 'one' },
      { from: 'one', to: 'two' },
      { from: 'two', to: 'three' },
      { from: [ 'one', 'three' ], to: 'four'}
    ])
  }
}
const instance = new Stateful()
instance.state = 'one'  // valid state change
instance.state = 'two'  // valid state change
instance.state = 'four' // throws - invalid state change
```

<a name="module_fsm-base"></a>

## fsm-base

* [fsm-base](#module_fsm-base)
    * [StateMachine](#exp_module_fsm-base--StateMachine) ⏏
        * _instance_
            * [.state](#module_fsm-base--StateMachine+state) : <code>string</code>
            * [._initStateMachine(initialState, validMoves)](#module_fsm-base--StateMachine+_initStateMachine)
            * [._onStateChange(state, prevState)](#module_fsm-base--StateMachine+_onStateChange)
            * [.resetState()](#module_fsm-base--StateMachine+resetState)
        * _static_
            * [.mixInto(target, initialState, validMoves)](#module_fsm-base--StateMachine.mixInto)

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

<a name="module_fsm-base--StateMachine+_onStateChange"></a>

#### stateMachine.\_onStateChange(state, prevState)
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

#### StateMachine.mixInto(target, initialState, validMoves)
**Kind**: static method of [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | The target to receive the state machine behaviour. |
| initialState | <code>string</code> | Initial state, e.g. 'pending'. |
| validMoves | <code>Array.&lt;object&gt;</code> | Array of valid move rules. |


* * *

&copy; 2015-23 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
