const Tom = require('test-runner').Tom
const StateMachine = require('./')
const a = require('assert')

const tom = module.exports = new Tom()

const validMoves = [
  { from: undefined, to: 'one' },
  { from: 'one', to: 'two' },
  { from: 'two', to: 'three' },
  { from: [ 'one', 'three' ], to: 'four' }
]

tom.test('valid move', function () {
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

tom.test('invalid move', function () {
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

tom.test('setState: custom event args', function () {
  const sm = new StateMachine([
    { from: undefined, to: 'one' }
  ])
  let eventCount = 0
  const testArg = {}

  sm.on('one', function (arg) {
    a.strictEqual(arg, testArg)
    eventCount++
  })

  sm.setState('one', testArg)
  a.strictEqual(eventCount, 1)
})
