const Tom = require('test-runner').Tom
const StateMachine = require('./')
const a = require('assert').strict

const tom = module.exports = new Tom()

const validMoves = [
  { from: null, to: 'one' },
  { from: 'one', to: 'two' },
  { from: 'two', to: 'three' },
  { from: ['one', 'three'], to: 'four' }
]

tom.test('valid move', function () {
  const sm = new StateMachine(null, validMoves)
  const actuals = []

  sm.on('state', function (state, prevState) {
    a.equal(state, 'one')
    a.equal(prevState, null)
    actuals.push('state')
  })

  sm.on('one', function () {
    actuals.push('one')
  })

  sm.state = 'one'
  sm.state = 'one' // should not trigger events again
  a.equal(sm.state, 'one')
  a.deepEqual(actuals, ['state', 'one'])
})

tom.test('invalid move', function () {
  const sm = new StateMachine(null, validMoves)
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
    a.equal(err.message, "Can only move to 'two' from 'one' (not 'null')")
  }
  a.deepEqual(actuals, [])
})

tom.test('setState: custom event args', function () {
  const sm = new StateMachine(null, [
    { from: null, to: 'one' }
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

tom.test('resetState(): returns to initialState and fires "reset" event', function () {
  const sm = new StateMachine('one', [
    { from: 'one', to: 'two' }
  ])
  const actuals = []

  sm.on('reset', function (prevState) {
    actuals.push('reset:' + prevState)
    actuals.push(this.state)
  })

  actuals.push('one')
  sm.state = 'two'
  actuals.push('two')
  sm.resetState()
  actuals.push(sm.state)
  a.deepEqual(actuals, ['one', 'two', 'reset:two', 'one', 'one'])
})
