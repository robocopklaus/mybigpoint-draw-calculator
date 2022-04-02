import './styles.css'

import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'

import MatchOverview from './components/MatchOverview'
import { Match, Player } from './types'
import { generateMatches } from './utils'

const Popup = (): JSX.Element | null => {
  const [matches, setMatches] = useState<Match[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player>()

  const getPlayers = async (): Promise<Player[]> => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
    if (tab?.id == null) return []

    // TODO: Define message type
    const players = await browser.tabs.sendMessage(tab.id, { action: 'PARSE_PLAYERS' })
    return players
  }

  useEffect(() => {
    getPlayers()
      .then(players => {
        setPlayers(players)
        if (players.length >= 3) {
          setMatches(generateMatches(players))
        }
      })
      .catch(console.error)

    browser.storage.sync
      .get('player')
      .then(({ player }) => {
        setCurrentPlayer(player)
      })
      .catch(console.error)
  }, [setMatches, setPlayers, setCurrentPlayer])

  const handleClick = async (): Promise<void> => {
    if (currentPlayer == null) {
      await browser.runtime.openOptionsPage()
    } else {
      setPlayers([...players, currentPlayer])
      setMatches(generateMatches([...players, currentPlayer]))
    }
  }

  const NotEnoughPlayers = (): JSX.Element => (
    <span className="font-bold py-4 px-2">Nicht genügend Spieler angemeldet</span>
  )

  const isAddMeEnabled = (): boolean => players.findIndex(player => player.name === currentPlayer?.name) === -1

  return (
    <div className="w-max p-4 min-h-screen dark:bg-neutral-800">
      {players.length < 3 ? (
        <NotEnoughPlayers />
      ) : (
        <>
          <MatchOverview matches={matches} player={currentPlayer} />

          {isAddMeEnabled() ? (
            <button
              className="mt-4 py-2 w-full font-semibold text-sm border-neutral-800 bg-neutral-900 rounded text-neutral-100 dark:border-neutral-100 dark:bg-neutral-50 dark:text-neutral-900"
              onClick={handleClick}
            >
              Mich zum Feld hinzufügen
            </button>
          ) : null}
        </>
      )}
    </div>
  )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<Popup />)
