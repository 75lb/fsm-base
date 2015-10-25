'use strict'
var test = require('tape')
var StateMachine = require('../')

test('summary', function (t) {
  var validMoves = [
    { from: 'one', to: 'two' },
    { from: 'two', to: 'three' },
    { from: [ 'one', 'three' ], to: 'four'}
  ]

  var sm = new StateMachine({
    validMoves: validMoves,
    state: 'one'
  })

  t.strictEqual(sm.state, 'one', 'state is one')

  /* valid change to 'two' */
  sm.once('state', function (state) {
    if (state === 'two') t.pass("'two' state set")
  })
  var failMessage = sm._setState('two')
  t.strictEqual(failMessage, null, 'failMessage is null')
  t.strictEqual(sm.state, 'two', 'state is two')

  sm.removeAllListeners()

  /* invalid change to 'four' */
  sm.once('state', function (state) {
    if (state === 'four') t.fail("'fail' state should not set")
  })
  sm.once('change', function (from, to) {
    t.fail('change should not fire')
  })
  try {
    sm._setState('four')
  } catch (e) {
    t.strictEqual(e.message, "Can only move to 'four' from 'one' or 'three'", 'change to four failMessage')
  }
  t.strictEqual(sm.state, 'two', 'state is two')

  sm.removeAllListeners()

  /* valid change to 'four' */
  sm._setState('three')
  t.strictEqual(sm.state, 'three', 'state is three')
  sm.once('state', function (state, prev) {
    if (state === 'four') t.pass('change from three to four fired')
    t.strictEqual(state, 'four', 'state is four')
    t.strictEqual(prev, 'three', 'prev is three')
  })
  failMessage = sm._setState('four')
  t.strictEqual(failMessage, null, 'failMessage is null')
  t.strictEqual(sm.state, 'four', 'state is four')
  t.end()
})
