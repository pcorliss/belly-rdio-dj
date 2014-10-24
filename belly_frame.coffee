
$ ->
  location = window.location.href
  frame_id = parseInt( location[location.length - 1], 10)

  rdio = null

  window.parent.addEventListener "message", ((m) ->
    if m.data.frame == frame_id
      console.log "Frame#{frame_id}:", m.data
      if m.data.cmd == 'init'
        rdio = $('#api').rdio(m.data.token)
        window.rdio = rdio
      if m.data.cmd == 'play'
        #debugger
        rdio.play(m.data.song)
        1
  ), false

