'use strict'
var arrayify = require('array-back')
var EventEmitter = require('events').EventEmitter
var util = require('util')
var flatten = require('array-flatten')

/**
 * @class
 * @alias module:fsm-base
 * @extends {EventEmitter}
 */
class StateMachine extends EventEmitter {
  constructor (options) {
    super()

    /**
     * The current state
     * @type {string}
     */
    this.state = options.state
    this._validMoves = arrayify(options.validMoves)

    /**
     * Possible exceptions
     * @enum {string}
     */
    this.eStateError = {
      INVALID_MOVE: 'INVALID_MOVE'
    }
  }

  /**
   * @param {string} - the state to set
   * @param {Array.<*>} - an array of args to emit with the new state
   * @throws `INVALID_MOVE` if an invalid move made
   */
  _setState (state, emitArgs) {
    /* nothing to do */
    if (this.state === state) return

    var moved = false
    var prevState = this.state
    this._validMoves.forEach(move => {
      move.from = arrayify(move.from)
      move.to = arrayify(move.to)
      if (move.from.indexOf(this.state) > -1 && move.to.indexOf(state) > -1) {
        this.state = state
        moved = true
        /**
         * fired on every state change
         * @event module:fsm-base#state
         * @param state {string} - the new state
         * @param prev {string} - the previous state
         * @param ...emitArgs {*} - arbitrary args
         */
        this.emit.apply(this, [ 'state', state, prevState ].concat(emitArgs))

        /**
         * fired on every state change
         * @event module:fsm-base#&lt;state value&gt;
         * @param ...emitArgs {*} - arbitrary args
         */
        this.emit.apply(this, [ state ].concat(emitArgs))
      }
    })
    if (moved) {
      return null
    } else {
      var froms = this._validMoves
        .filter(move => move.to.indexOf(state) > -1)
        .map(move => move.from.map(from => "'" + from + "'"))
      froms = flatten(froms)
      var msg = util.format("Can only move to '%s' from %s (not '%s')", state, froms.join(' or ') || '<unspecified>', prevState)
      var err = new Error(msg)
      err.name = this.eStateError.INVALID_MOVE
      throw err
    }
  }
}

/**
 * @module fsm-base
 * @typicalname stateMachine
 * @example
 * var StateMachine = require("fsm-base")
 *
 * class Stateful extends StateMachine {
 * 	super({
 * 		validMoves: [
 * 			{ from: "one", to: "two" },
 * 			{ from: "two", to: "three" },
 * 			{ from: [ "one", "three" ], to: "four"}
 * 		],
 * 		// default state
 * 		state: "one"
 * 	})
 * }
 *
 * my instance = new Stateful()
 * instance._setState("two") // valid state change
 * instance._setState("four"); // throws - invalid state change
 *
 */
module.exports = StateMachine
