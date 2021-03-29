import React from 'react'
import mitt from 'mitt'

export const emitter = mitt()

export const EmitterContext = React.createContext(emitter)
