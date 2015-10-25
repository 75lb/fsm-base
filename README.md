<a name="module_fsm-base"></a>
## fsm-base
**Example**  
```js
var StateMachine = require("fsm-base");
var util = require("util");

function MyClass(){
	StateMachine.call(this, {
		validMoves: [
			{ from: "one", to: "two" },
			{ from: "two", to: "three" },
			{ from: [ "one", "three" ], to: "four"}

		],
		// default state
		state: "one"
	});
}
util.inherits(MyClass, StateMachine);

my obj = new MyClass();
obj._setState("two"); // valid state change
var failReason = obj._setState("four"); // invalid state change, failReason equals "can't move from 'two' to 'four'"
```

* [fsm-base](#module_fsm-base)
  * [StateMachine](#exp_module_fsm-base--StateMachine) ⏏
    * [.state](#module_fsm-base--StateMachine#state) : <code>string</code>
    * [._setState(state, emitArgs)](#module_fsm-base--StateMachine#_setState)
    * ["state" (state, prev)](#module_fsm-base--StateMachine#event_state)

<a name="exp_module_fsm-base--StateMachine"></a>
### StateMachine ⏏
**Kind**: Exported class  
<a name="module_fsm-base--StateMachine#state"></a>
#### stateMachine.state : <code>string</code>
The current state

**Kind**: instance property of <code>[StateMachine](#exp_module_fsm-base--StateMachine)</code>  
<a name="module_fsm-base--StateMachine#_setState"></a>
#### stateMachine._setState(state, emitArgs)
**Kind**: instance method of <code>[StateMachine](#exp_module_fsm-base--StateMachine)</code>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | the state to set |
| emitArgs | <code>Array.&lt;\*&gt;</code> | an array of args to emit with the new state |

<a name="module_fsm-base--StateMachine#event_state"></a>
#### "state" (state, prev)
fired on every state change

**Kind**: event emitted by <code>[StateMachine](#exp_module_fsm-base--StateMachine)</code>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | the new state |
| prev | <code>string</code> | the previous state |

