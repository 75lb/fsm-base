'use strict'
var arrayify = require('array-back')
var EventEmitter = require('events').EventEmitter
var util = require('util')
var flatten = require('array-flatten')

/**
 * @class
 * @alias module:fsm-base
 */
class StateMachine extends EventEmitter {
  constructor (options) {
    super()

    /**
    The current state
    @type {string}
    */
    this.state = options.state
    this._validMoves = arrayify(options.validMoves)

    /**
    Possible exceptions
    */
    this.eStateError = {
      INVALID_MOVE: 'invalid-move'
    }
  }

  /**
  @param {string} - the state to set
  @param {Array.<*>} - an array of args to emit with the new state
  */
  _setState (state, emitArgs) {
    var self = this

    /* nothing to do */
    if (this.state === state) return

    var moved = false
    var prevState = self.state
    this._validMoves.forEach(function (move) {
      move.from = arrayify(move.from)
      move.to = arrayify(move.to)
      if (move.from.indexOf(self.state) > -1 && move.to.indexOf(state) > -1) {
        self.state = state
        moved = true
        /**
        fired on every state change
        @event module:fsm-base#state
        @param state {string} - the new state
        @param prev {string} - the previous state
        */

        self.emit.apply(self, [ 'state', state, prevState ].concat(emitArgs))
        self.emit.apply(self, [ state ].concat(emitArgs))
      }
    })
    if (moved) {
      return null
    } else {
      var froms = this._validMoves.filter(function (move) {
        return move.to.indexOf(state) > -1
      }).map(function (move) {
        return move.from.map(function (from) {
          return "'" + from + "'"
        })
      })
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
 * var util = require("util")
 *
 * function MyClass(){
 * 	StateMachine.call(this, {
 * 		validMoves: [
 * 			{ from: "one", to: "two" },
 * 			{ from: "two", to: "three" },
 * 			{ from: [ "one", "three" ], to: "four"}
 *
 * 		],
 * 		// default state
 * 		state: "one"
 * 	})
 * }
 * util.inherits(MyClass, StateMachine)
 *
 * my obj = new MyClass()
 * obj._setState("two") // valid state change
 * var failReason = obj._setState("four"); // invalid state change, failReason equals "can't move from  * 'two' to 'four'"
 *
 */
module.exports = StateMachine
