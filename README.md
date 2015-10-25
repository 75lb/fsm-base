<a name="module_fsm-base"></a>
## fsm-base
**Example**  
```js
var StateMachine = require("fsm-base")

class MyClass extends StateMachine {
	super({
		validMoves: [
			{ from: "one", to: "two" },
			{ from: "two", to: "three" },
			{ from: [ "one", "three" ], to: "four"}
		],
		// default state
		state: "one"
	})
}

my obj = new MyClass()
obj._setState("two") // valid state change
obj._setState("four"); // throws - invalid state change
```

* [fsm-base](#module_fsm-base)
  * [StateMachine](#exp_module_fsm-base--StateMachine) ⇐ <code>EventEmitter</code> ⏏
    * [._setState(state, emitArgs)](#module_fsm-base--StateMachine+_setState)
    * ["state" (state, prev, ...emitArgs)](#module_fsm-base--StateMachine+event_state)
    * ["<state value>" (...emitArgs)](#module_fsm-base--StateMachine+event_<state value>)

<a name="exp_module_fsm-base--StateMachine"></a>
### StateMachine ⇐ <code>EventEmitter</code> ⏏
**Kind**: global class of <code>[fsm-base](#module_fsm-base)</code>  
**Extends:** <code>EventEmitter</code>  
<a name="module_fsm-base--StateMachine+_setState"></a>
#### stateMachine._setState(state, emitArgs)
**Kind**: instance method of <code>[StateMachine](#exp_module_fsm-base--StateMachine)</code>  
**Throws**:

- `INVALID_MOVE` if an invalid move made


| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | the state to set |
| emitArgs | <code>Array.&lt;\*&gt;</code> | an array of args to emit with the new state |

<a name="module_fsm-base--StateMachine+event_state"></a>
#### "state" (state, prev, ...emitArgs)
fired on every state change

**Kind**: event emitted by <code>[StateMachine](#exp_module_fsm-base--StateMachine)</code>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | the new state |
| prev | <code>string</code> | the previous state |
| ...emitArgs | <code>\*</code> | arbitrary args |

<a name="module_fsm-base--StateMachine+event_<state value>"></a>
#### "<state value>" (...emitArgs)
fired on every state change

**Kind**: event emitted by <code>[StateMachine](#exp_module_fsm-base--StateMachine)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...emitArgs | <code>\*</code> | arbitrary args |

