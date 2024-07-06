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

