import { Match, Player } from './types'

export const generateMatches = (players: Player[]): Match[] =>
  players
    .sort((a, b) => a.rating - b.rating)
    .slice(0, players.length)
    .map((playerOne, index, players) => {
      if (index === 0)
        return [
          { playerOne, playerTwo: players[1] },
          { playerOne, playerTwo: players[2] }
        ]

      if (index === players.length - 1)
        return [
          { playerOne: players[index - 2], playerTwo: playerOne },
          { playerOne: players[index - 1], playerTwo: playerOne }
        ]

      return [
        { playerOne: players[index - 2 < 0 ? 0 : index - 2], playerTwo: players[index] },
        {
          playerOne: players[index],
          playerTwo: players[index + 2 > players.length - 1 ? players.length - 1 : index + 2]
        }
      ]
    })
    .flatMap(m => m)
    .filter(
      (match, index, matches) =>
        // @ts-expect-error
        matches.findIndex(m2 => ['playerOne', 'playerTwo'].every(k => m2[k].name === match[k].name)) === index
    )
