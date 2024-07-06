import StateMachine from 'fsm-base'

/* Extend */

{
  class Device extends StateMachine {}

  const device = new Device()
  device._initStateMachine('offline', [
    { from: 'offline', to: 'connecting' },
    { from: 'connecting', to: 'online' },
    { from: ['connecting', 'online'], to: 'offline' }
  ])

  device.onStateChange = function (state, prevState) {
    console.log(state, prevState)
  }

  device.state = 'connecting'
  device.state = 'connecting' // should not trigger events again
  device.state = 'online'
  device.state = 'offline' // valid state move
}

/* Mix-in */

{
  class Device {}
  StateMachine.mixInto(Device)

  const device = new Device()
  device._initStateMachine('offline', [
    { from: 'offline', to: 'connecting' },
    { from: 'connecting', to: 'online' },
    { from: ['connecting', 'online'], to: 'offline' }
  ])

  device.onStateChange = function (state, prevState) {
    console.log(state, prevState)
  }

  device.state = 'connecting'
  device.state = 'connecting' // should not trigger events again
  device.state = 'online'
  device.state = 'offline' // valid state move

}
