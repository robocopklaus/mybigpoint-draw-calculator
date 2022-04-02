import { Player } from './types'

const parsePlayers = (): Player[] =>
  [...document.querySelectorAll('.plainGrid.trnlist.z-row')]
    .reduce<Element[]>((acc, tr, index, arr) => {
      if (index === 0 && tr.querySelectorAll('td').length !== 7) return acc

      const cutOffIndex = arr.findIndex((tr, index) => tr.querySelectorAll('td').length !== 7 && index > 0)
      if (cutOffIndex > 0 && index >= cutOffIndex) return acc

      return [...acc, tr]
    }, [])
    .map(tr => {
      const rawName = tr.querySelectorAll('td')[2].querySelector('span')?.innerText ?? 'Unknown'
      const rawRating =
        tr.querySelectorAll('td')[5].querySelector('span')?.innerText ??
        tr.querySelectorAll('td')[6].querySelector('span')?.innerText ??
        'LK'

      const name = `${rawName.split(' ').slice(1).join(' ')} ${rawName.split(' ')[0]}`
      const rating = parseFloat(rawRating.replace('LK', '').replace(',', '.'))

      return { name, rating }
    })

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => sendResponse(parsePlayers()))
