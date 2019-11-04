const Tom = require('test-runner').Tom
const StateMachine = require('./')
const a = require('assert').strict

const tom = module.exports = new Tom()

const validMoves = [
  { from: undefined, to: 'one' },
  { from: 'one', to: 'two' },
  { from: 'two', to: 'three' },
  { from: [ 'one', 'three' ], to: 'four' }
]

tom.test('valid move', function () {
  const sm = new StateMachine(validMoves)
  const actuals = []

  sm.on('state', function (state, prevState) {
    a.equal(state, 'one')
    a.equal(prevState, undefined)
    actuals.push('state')
  })

  sm.on('one', function () {
    actuals.push('one')
  })

  sm.state = 'one'
  sm.state = 'one' // should not trigger events again
  a.equal(sm.state, 'one')
  a.deepEqual(actuals, [ 'state', 'one' ])
})

tom.test('invalid move', function () {
  const sm = new StateMachine(validMoves)
  const actuals = []

  sm.on('state', function (state, prevState) {
    actuals.push('state')
  })

  sm.on('one', function () {
    actuals.push('one')
  })

  try {
    sm.state = 'two'
    actuals.push('set:two')
  } catch (err) {
    a.equal(err.message, "Can only move to 'two' from 'one' (not 'undefined')")
  }
  a.deepEqual(actuals, [])
})

tom.test('setState: custom event args', function () {
  const sm = new StateMachine([
    { from: undefined, to: 'one' }
  ])
  const actuals = []
  const testArg = {}

  sm.on('one', function (arg) {
    a.equal(arg, testArg)
    actuals.push('one')
  })

  sm.setState('one', testArg)
  a.deepEqual(actuals, ['one'])
})
