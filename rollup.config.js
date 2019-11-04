module.exports = [
  {
    input: 'index.mjs',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'StateMachine'
    }
  },
  {
    input: 'index.mjs',
    output: {
      file: 'dist/index.mjs',
      format: 'esm'
    }
  }
]
