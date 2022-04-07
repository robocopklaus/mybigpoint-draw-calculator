import React from 'react'

import { Match, Player } from '../types'

interface MatchOverviewProps {
  matches: Match[]
  player?: Player
}

const MatchOverview = ({ matches, player }: MatchOverviewProps): JSX.Element => {
  return (
    <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
      <thead className="sticky top-0 text-xs uppercase text-neutral-700 bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            LK
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            LK
          </th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, index) => (
          <tr
            key={index}
            className={`${
              match.playerOne.name === player?.name || match.playerTwo.name === player?.name
                ? 'bg-green-400 dark:bg-green-900 hover:bg-green-300 dark:hover:bg-green-800'
                : 'bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-600'
            } border-b dark:border-neutral-700 `}
          >
            <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
              {match.playerOne.name}
            </td>
            <td className="px-6 py-4">{match.playerOne.rating}</td>
            <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
              {match.playerTwo.name}
            </td>
            <td className="px-6 py-4">{match.playerTwo.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MatchOverview
