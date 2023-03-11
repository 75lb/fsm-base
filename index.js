import arrayify from 'array-back'

/**
 * @module fsm-base
 * @typicalname stateMachine
 */

const _initialState = new WeakMap()
const _state = new WeakMap()
const _validMoves = new WeakMap()

/**
 * @alias module:fsm-base
 */
class StateMachine {
  /**
   * @param {object} - The target to receive the state machine behaviour.
   * @param {string} - Initial state, e.g. 'pending'.
   * @param {object[]} - Array of valid move rules.
   */
  static mixInto (target, initialState, validMoves) {
    Object.defineProperty(target, 'state', Object.getOwnPropertyDescriptor(this.prototype, 'state'))
    Object.defineProperty(target, 'resetState', Object.getOwnPropertyDescriptor(this.prototype, 'resetState'))
    Object.defineProperty(target, '_initStateMachine', Object.getOwnPropertyDescriptor(this.prototype, '_initStateMachine'))
    Object.defineProperty(target, '_onStateChange', Object.getOwnPropertyDescriptor(this.prototype, '_onStateChange'))
    if (validMoves) {
      target._initStateMachine(initialState, validMoves)
    }
    return target
  }

  /**
   * @param {string} - Initial state, e.g. 'pending'.
   * @param {object[]} - Array of valid move rules.
   */
  _initStateMachine (initialState, validMoves) {
    _validMoves.set(this, arrayify(validMoves).map(move => {
      move.from = arrayify(move.from)
      move.to = arrayify(move.to)
      return move
    }))
    _state.set(this, initialState)
    _initialState.set(this, initialState)
  }

  /**
   * Invoked on every state change
   * @param {string} - the new state
   * @param {string} - the previous state
   */
  _onStateChange (state, prevState) {}

  /**
   * The current state
   * @type {string} state
   * @throws `INVALID_MOVE` if an invalid move made
   */
  get state () {
    return _state.get(this)
  }

  set state (state) {
    /* nothing to do */
    if (this.state === state) return

    const validTo = _validMoves.get(this).some(move => move.to.indexOf(state) > -1)
    if (!validTo) {
      const err = new Error(`Invalid state: ${state}`)
      err.name = 'INVALID_MOVE'
      throw err
    }

    let moved = false
    const prevState = this.state
    for (const move of _validMoves.get(this)) {
      if (move.from.includes(prevState) && move.to.includes(state)) {
        _state.set(this, state)
        moved = true
        this._onStateChange(state, prevState)
      }
    }
    if (!moved) {
      const froms = _validMoves.get(this)
        .filter(move => move.to.includes(state))
        .map(move => move.from.map(from => `'${from}'`))
        .flat()
      const msg = `Can only move to '${state}' from ${froms.join(' or ') || '<unspecified>'} (not '${prevState}')`
      const err = new Error(msg)
      err.name = 'INVALID_MOVE'
      throw err
    }
  }

  /**
   * Reset to initial state.
   */
  resetState () {
    _state.set(this, _initialState.get(this))
  }
}

export default StateMachine
