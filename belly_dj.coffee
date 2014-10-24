$ ->
  tokens = [
    'GAlUSoJ1_____3h4NWV0bXZiNThiNDRqOGVmOXQ3cG4zdWxvY2FsaG9zdB-2VUCIzGZncDDMBuh5McM='
    'GAlUSoMQ_____3h4NWV0bXZiNThiNDRqOGVmOXQ3cG4zdWxvY2FsaG9zdDuEjVTHMn5bov7jS5g0kpg='
  ]

  window.postMessage
    frame: 1
    cmd: 'init'
    token: tokens[0]
  , '*'

  window.postMessage
    frame: 2
    cmd: 'init'
    token: tokens[1]
  , '*'
