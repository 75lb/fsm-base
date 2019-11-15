(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.StateMachine = factory());
}(this, (function () { 'use strict';

  /**
   * @module obso
   */

  /**
   * @alias module:obso
   */
  class Emitter {
    /**
     * Emit an event.
     * @param {string} eventName - the event name to emit.
     * @param ...args {*} - args to pass to the event handler
     */
    emit (eventName, ...args) {
      if (this._listeners && this._listeners.length > 0) {
        const toRemove = [];

        /* invoke each relevant listener */
        for (const listener of this._listeners) {
          const handlerArgs = args.slice();
          if (listener.eventName === '__ALL__') {
            handlerArgs.unshift(eventName);
          }

          if (listener.eventName === '__ALL__' || listener.eventName === eventName) {
            listener.handler.call(this, ...handlerArgs);

            /* remove once handler */
            if (listener.once) toRemove.push(listener);
          }
        }

        toRemove.forEach(listener => {
          this._listeners.splice(this._listeners.indexOf(listener), 1);
        });
      }

      /* bubble event up */
      if (this.parent) this.parent._emitTarget(eventName, this, ...args);
    }

    _emitTarget (eventName, target, ...args) {
      if (this._listeners && this._listeners.length > 0) {
        const toRemove = [];

        /* invoke each relevant listener */
        for (const listener of this._listeners) {
          const handlerArgs = args.slice();
          if (listener.eventName === '__ALL__') {
            handlerArgs.unshift(eventName);
          }

          if (listener.eventName === '__ALL__' || listener.eventName === eventName) {
            listener.handler.call(target, ...handlerArgs);

            /* remove once handler */
            if (listener.once) toRemove.push(listener);
          }
        }

        toRemove.forEach(listener => {
          this._listeners.splice(this._listeners.indexOf(listener), 1);
        });
      }

      /* bubble event up */
      if (this.parent) this.parent._emitTarget(eventName, target || this, ...args);
    }

     /**
      * Register an event listener.
      * @param {string} [eventName] - The event name to watch. Omitting the name will catch all events.
      * @param {function} handler - The function to be called when `eventName` is emitted. Invocated with `this` set to `emitter`.
      * @param {object} [options]
      * @param {boolean} [options.once] - If `true`, the handler will be invoked once then removed.
      */
    on (eventName, handler, options) {
      createListenersArray(this);
      options = options || {};
      if (arguments.length === 1 && typeof eventName === 'function') {
        handler = eventName;
        eventName = '__ALL__';
      }
      if (!handler) {
        throw new Error('handler function required')
      } else if (handler && typeof handler !== 'function') {
        throw new Error('handler arg must be a function')
      } else {
        this._listeners.push({ eventName, handler: handler, once: options.once });
      }
    }

    /**
     * Remove an event listener.
     * @param eventName {string} - the event name
     * @param handler {function} - the event handler
     */
    removeEventListener (eventName, handler) {
      if (!this._listeners || this._listeners.length === 0) return
      const index = this._listeners.findIndex(function (listener) {
        return listener.eventName === eventName && listener.handler === handler
      });
      if (index > -1) this._listeners.splice(index, 1);
    }

    /**
     * Once.
     * @param {string} eventName - the event name to watch
     * @param {function} handler - the event handler
     */
    once (eventName, handler) {
      /* TODO: the once option is browser-only */
      this.on(eventName, handler, { once: true });
    }

    /**
     * Propagate events from the supplied emitter to this emitter.
     * @param {string} eventName - the event name to propagate
     * @param {object} from - the emitter to propagate from
     */
    propagate (eventName, from) {
      from.on(eventName, (...args) => this.emit(eventName, ...args));
    }
  }

  /**
   * Alias for `on`.
   */
  Emitter.prototype.addEventListener = Emitter.prototype.on;

  function createListenersArray (target) {
    if (target._listeners) return
    Object.defineProperty(target, '_listeners', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: []
    });
  }

  /**
   * Takes any input and guarantees an array back.
   *
   * - Converts array-like objects (e.g. `arguments`, `Set`) to a real array.
   * - Converts `undefined` to an empty array.
   * - Converts any another other, singular value (including `null`, objects and iterables other than `Set`) into an array containing that value.
   * - Ignores input which is already an array.
   *
   * @module array-back
   * @example
   * > const arrayify = require('array-back')
   *
   * > arrayify(undefined)
   * []
   *
   * > arrayify(null)
   * [ null ]
   *
   * > arrayify(0)
   * [ 0 ]
   *
   * > arrayify([ 1, 2 ])
   * [ 1, 2 ]
   *
   * > arrayify(new Set([ 1, 2 ]))
   * [ 1, 2 ]
   *
   * > function f(){ return arrayify(arguments); }
   * > f(1,2,3)
   * [ 1, 2, 3 ]
   */

  function isObject (input) {
    return typeof input === 'object' && input !== null
  }

  function isArrayLike (input) {
    return isObject(input) && typeof input.length === 'number'
  }

  /**
   * @param {*} - The input value to convert to an array
   * @returns {Array}
   * @alias module:array-back
   */
  function arrayify (input) {
    if (Array.isArray(input)) {
      return input
    }

    if (input === undefined) {
      return []
    }

    if (isArrayLike(input) || input instanceof Set) {
      return Array.from(input)
    }

    return [input]
  }

  /**
   * Isomorphic map-reduce function to flatten an array into the supplied array.
   *
   * @module reduce-flatten
   * @example
   * const flatten = require('reduce-flatten')
   */

  /**
   * @alias module:reduce-flatten
   * @example
   * > numbers = [ 1, 2, [ 3, 4 ], 5 ]
   * > numbers.reduce(flatten, [])
   * [ 1, 2, 3, 4, 5 ]
   */
  function flatten (arr, curr) {
    if (Array.isArray(curr)) {
      arr.push(...curr);
    } else {
      arr.push(curr);
    }
    return arr
  }

  /**
   * @module fsm-base
   * @typicalname stateMachine
   */

  const _initialState = new WeakMap();
  const _state = new WeakMap();
  const _validMoves = new WeakMap();

  /**
   * @alias module:fsm-base
   * @extends {Emitter}
   */
  class StateMachine extends Emitter {
    constructor (initialState, validMoves) {
      super();
      _validMoves.set(this, arrayify(validMoves).map(move => {
        move.from = arrayify(move.from);
        move.to = arrayify(move.to);
        return move
      }));
      _state.set(this, initialState);
      _initialState.set(this, initialState);
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
      this.setState(state);
    }

    /**
     * Set the current state. The second arg onward will be sent as event args.
     * @param {string} state
     */
    setState (state, ...args) {
      /* nothing to do */
      if (this.state === state) return

      const validTo = _validMoves.get(this).some(move => move.to.indexOf(state) > -1);
      if (!validTo) {
        const msg = `Invalid state: ${state}`;
        const err = new Error(msg);
        err.name = 'INVALID_MOVE';
        throw err
      }

      let moved = false;
      const prevState = this.state;
      _validMoves.get(this).forEach(move => {
        if (move.from.indexOf(this.state) > -1 && move.to.indexOf(state) > -1) {
          _state.set(this, state);
          moved = true;
          /**
           * fired on every state change
           * @event module:fsm-base#state
           * @param state {string} - the new state
           * @param prev {string} - the previous state
           */
          this.emit('state', state, prevState);

          /**
           * fired on every state change
           * @event module:fsm-base#&lt;state value&gt;
           */
          this.emit(state, ...args);
        }
      });
      if (!moved) {
        const froms = _validMoves.get(this)
          .filter(move => move.to.indexOf(state) > -1)
          .map(move => move.from.map(from => `'${from}'`))
          .reduce(flatten);
        const msg = `Can only move to '${state}' from ${froms.join(' or ') || '<unspecified>'} (not '${prevState}')`;
        const err = new Error(msg);
        err.name = 'INVALID_MOVE';
        throw err
      }
    }

    resetState () {
      const prevState = this.state;
      const initialState = _initialState.get(this);
      _state.set(this, initialState);
      this.emit('reset', prevState);
    }
  }

  return StateMachine;

})));
