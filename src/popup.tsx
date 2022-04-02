import './styles.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

const Popup = (): JSX.Element | null => {
  return (
    <div className="w-max p-4 min-h-screen dark:bg-neutral-800">
      <h1>mybigpoint Draw Calculator</h1>
    </div>
  )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Popup />)
