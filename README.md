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
