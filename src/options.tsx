import './styles.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

const Options = (): JSX.Element => {
  return (
    <div className="w-full">
      <h1>Options</h1>
    </div>
  )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Options />)
