[![view on npm](https://img.shields.io/npm/v/fsm-base.svg)](https://www.npmjs.org/package/fsm-base)
[![npm module downloads](https://img.shields.io/npm/dt/fsm-base.svg)](https://www.npmjs.org/package/fsm-base)
[![Build Status](https://travis-ci.org/75lb/fsm-base.svg?branch=master)](https://travis-ci.org/75lb/fsm-base)
[![Dependency Status](https://david-dm.org/75lb/fsm-base.svg)](https://david-dm.org/75lb/fsm-base)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_fsm-base"></a>

## fsm-base
**Example**  
```js
const StateMachine = require('fsm-base')

class Stateful extends StateMachine {
 super([
   { from: undefined, to: 'one' },
   { from: 'one', to: 'two' },
   { from: 'two', to: 'three' },
   { from: [ 'one', 'three' ], to: 'four'}
 ])
}
const instance = new Stateful()
instance.state = 'one'  // valid state change
instance.state = 'two'  // valid state change
instance.state = 'four' // throws - invalid state change
```

* [fsm-base](#module_fsm-base)
    * [StateMachine](#exp_module_fsm-base--StateMachine) ⇐ <code>EventEmitter</code> ⏏
        * [.state](#module_fsm-base--StateMachine+state) : <code>string</code>
        * ["state" (state, prev)](#module_fsm-base--StateMachine+event_state)
        * ["&lt;state value&gt;"](#module_fsm-base--StateMachine+event_&lt;state value&gt;)

<a name="exp_module_fsm-base--StateMachine"></a>

### StateMachine ⇐ <code>EventEmitter</code> ⏏
**Kind**: Exported class  
**Extends**: <code>EventEmitter</code>  
<a name="module_fsm-base--StateMachine+state"></a>

#### stateMachine.state : <code>string</code>
The current state

**Kind**: instance property of [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  
**Throws**:

- `INVALID_MOVE` if an invalid move made

<a name="module_fsm-base--StateMachine+event_state"></a>

#### "state" (state, prev)
fired on every state change

**Kind**: event emitted by [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | the new state |
| prev | <code>string</code> | the previous state |

<a name="module_fsm-base--StateMachine+event_&lt;state value&gt;"></a>

#### "&lt;state value&gt;"
fired on every state change

**Kind**: event emitted by [<code>StateMachine</code>](#exp_module_fsm-base--StateMachine)  

* * *

&copy; 2015-18 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).