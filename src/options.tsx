import './styles.css'

import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'

const Options = (): JSX.Element => {
  const [name, setName] = useState<string>()
  const [rating, setRating] = useState<number>()

  useEffect(() => {
    browser.storage.sync
      .get('player')
      .then(({ player }) => {
        setName(player.name)
        setRating(player.rating)
      })
      .catch(console.error)
  }, [setName, setRating])

  return (
    <div className="w-full">
      <form className="px-8 pt-2 pb-8 mb-4">
        <span className="block mb-4 text-neutral-400">
          Damit Du vor einer LK-Turnieranmeldung sehen kannst, gegen wen Du bei aktuellem Stand spielen würdest,
          benötigt das Tool Deinen Namen, unter dem Du bei mybigpoint gelistet bist, und Deine aktuelle LK.
        </span>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Dein Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            placeholder="Andre Agassi"
            value={name ?? ''}
            onChange={({ target: { value } }) => {
              if (value.length === 0 || value === '') return
              console.log({ name: value })
              setName(value)
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="rating">
            Deine LK
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min={1}
            max={25}
            step={0.1}
            placeholder="12.5"
            value={rating ?? 24}
            onChange={({ target: { value } }) => {
              if (value.length === 0 || value === '') return
              const rating = parseFloat(value)
              if (rating < 1 || rating > 25) return
              setRating(rating)
            }}
          />
        </div>

        <button
          className="py-2 w-full border-neutral-800 bg-neutral-900 rounded text-neutral-100 font-semibold text-sm"
          onClick={async event => {
            event.preventDefault()
            if (name == null || rating == null) return
            await browser.storage.sync.set({ player: { name, rating } })
          }}
        >
          Speichern
        </button>
      </form>
    </div>
  )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Options />)
