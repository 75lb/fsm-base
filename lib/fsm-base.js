'use strict'
const arrayify = require('array-back')
const EventEmitter = require('events').EventEmitter

/**
 * @module fsm-base
 * @typicalname stateMachine
 * @example
 * const StateMachine = require('fsm-base')
 *
 * class Stateful extends StateMachine {
 *  super([
 *    { from: undefined, to: 'one' },
 *    { from: 'one', to: 'two' },
 *    { from: 'two', to: 'three' },
 *    { from: [ 'one', 'three' ], to: 'four'}
 *  ])
 * }
 * const instance = new Stateful()
 * instance.state = 'one'  // valid state change
 * instance.state = 'two'  // valid state change
 * instance.state = 'four' // throws - invalid state change
 */

const _state = new WeakMap()

/**
 * @class
 * @alias module:fsm-base
 * @extends {EventEmitter}
 */
class StateMachine extends EventEmitter {
  constructor (validMoves) {
    super()

    this._validMoves = arrayify(validMoves).map(move => {
      if (!Array.isArray(move.from)) move.from = [ move.from ]
      if (!Array.isArray(move.to)) move.to = [ move.to ]
      return move
    })
  }

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

    const validTo = this._validMoves.some(move => move.to.indexOf(state) > -1)
    if (!validTo) {
      const msg = `Invalid state: ${state}`
      const err = new Error(msg)
      err.name = 'INVALID_MOVE'
      throw err
    }

    let moved = false
    const prevState = this.state
    this._validMoves.forEach(move => {
      if (move.from.indexOf(this.state) > -1 && move.to.indexOf(state) > -1) {
        _state.set(this, state)
        moved = true
        /**
         * fired on every state change
         * @event module:fsm-base#state
         * @param state {string} - the new state
         * @param prev {string} - the previous state
         */
        this.emit('state', state, prevState)

        /**
         * fired on every state change
         * @event module:fsm-base#&lt;state value&gt;
         */
        this.emit(state)
      }
    })
    if (!moved) {
      const flatten = require('array-flatten')
      let froms = this._validMoves
        .filter(move => move.to.indexOf(state) > -1)
        .map(move => move.from.map(from => `'${from}'`))
      froms = flatten(froms)
      const msg = `Can only move to '${state}' from ${froms.join(' or ') || '<unspecified>'} (not '${prevState}')`
      const err = new Error(msg)
      err.name = 'INVALID_MOVE'
      throw err
    }
  }
}

module.exports = StateMachine
