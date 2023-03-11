import TestRunner from 'test-runner'
import StateMachine from 'fsm-base'
import { strict as a } from 'node:assert'

const tom = new TestRunner.Tom()

tom.test('valid moves', function () {
  const target = {}
  const sm = StateMachine.mixInto(target)
  sm._initStateMachine('offline', [
    { from: 'offline', to: 'connecting' },
    { from: 'connecting', to: 'online' },
    { from: ['connecting', 'online'], to: 'offline' }
  ])

  const actuals = []

  sm._onStateChange = function (state, prevState) {
    actuals.push(state, prevState)
  }

  sm.state = 'connecting'
  sm.state = 'connecting' // should not trigger events again
  a.equal(sm.state, 'connecting')
  sm.state = 'online'
  sm.state = 'offline'
  a.deepEqual(actuals, [
    'connecting',   'offline',
    'online', 'connecting',
    'offline',  'online'
  ])
  a.equal(sm, target)
})

tom.test('multiple from 1', function () {
  const sm = StateMachine.mixInto({})
  sm._initStateMachine(null, [
    { from: null, to: 'one' },
    { from: 'one', to: 'two' },
    { from: 'two', to: 'three' },
    { from: ['one', 'three'], to: 'four' }
  ])
  sm.state = 'one'
  sm.state = 'four'
})

tom.test('multiple from 2', function () {
  const sm = StateMachine.mixInto({})
  sm._initStateMachine(null, [
    { from: null, to: 'one' },
    { from: 'one', to: 'two' },
    { from: 'two', to: 'three' },
    { from: ['one', 'three'], to: 'four' }
  ])
  sm.state = 'one'
  sm.state = 'two'
  sm.state = 'three'
  sm.state = 'four'
})

tom.test('invalid move', function () {
  const sm = StateMachine.mixInto({})
  sm._initStateMachine(null, [
    { from: null, to: 'one' },
    { from: 'one', to: 'two' },
    { from: 'two', to: 'three' }
  ])

  const actuals = []

  sm._onStateChange = function (state, prevState) {
    actuals.push(state, prevState)
  }

  try {
    sm.state = 'two'
    actuals.push('set:two')
  } catch (err) {
    a.equal(err.message, "Can only move to 'two' from 'one' (not 'null')")
  }
  a.deepEqual(actuals, [])
})

tom.test('invalid state', function () {
  const sm = StateMachine.mixInto({}, null, [
    { from: null, to: 'one' }
  ])

  const actuals = []

  sm._onStateChange = function (state, prevState) {
    actuals.push(state, prevState)
  }

  try {
    sm.state = 'invalid'
    actuals.push('set:invalid')
  } catch (err) {
    a.equal(err.message, 'Invalid state: invalid')
  }
  a.deepEqual(actuals, [])
})

tom.test('resetState(): returns to initialState', function () {
  const sm = StateMachine.mixInto({}, 'one', [
    { from: 'one', to: 'two' }
  ])
  const actuals = []

  actuals.push('one')
  sm.state = 'two'
  actuals.push('two')
  sm.resetState()
  actuals.push(sm.state)
  a.deepEqual(actuals, ['one', 'two', 'one'])
})

export default tom
