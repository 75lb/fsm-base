'use strict'
const TestRunner = require('test-runner')
const StateMachine = require('./')
const a = require('assert')

const runner = new TestRunner()

const validMoves = [
  { from: undefined, to: 'one' },
  { from: 'one', to: 'two' },
  { from: 'two', to: 'three' },
  { from: [ 'one', 'three' ], to: 'four' }
]

runner.test('valid move', function () {
  const sm = new StateMachine(validMoves)
  let eventCount = 0

  sm.on('state', function (state, prevState) {
    a.strictEqual(state, 'one')
    a.strictEqual(prevState, undefined)
    eventCount++
  })

  sm.on('one', function () {
    eventCount++
  })

  sm.state = 'one'
  sm.state = 'one' // should not trigger events again
  a.strictEqual(sm.state, 'one', 'state should be one')
  a.strictEqual(eventCount, 2)
})

runner.test('invalid move', function () {
  const sm = new StateMachine(validMoves)
  let eventCount = 0

  sm.on('state', function (state, prevState) {
    eventCount++
  })

  sm.on('one', function () {
    eventCount++
  })

  try {
    sm.state = 'two'
    eventCount++
  } catch (err) {
    a.strictEqual(err.message, "Can only move to 'two' from 'one' (not 'undefined')")
  }
  a.strictEqual(eventCount, 0)
})
