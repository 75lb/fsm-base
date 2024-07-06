import StateMachine from 'fsm-base'

/* Mix-in */

{
  const device = {}
  StateMachine.mixInto(device)

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
