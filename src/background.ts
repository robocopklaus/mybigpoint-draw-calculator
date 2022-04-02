import browser from 'webextension-polyfill'

browser.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on select tabs
  browser.action.disable().catch(console.error)

  // Clear all rules to ensure only our expected rules are set
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on mybigpoint tournament pages
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { urlEquals: 'https://spieler.tennis.de/group/guest/turniere' }
          })
        ],
        actions: [new browser.declarativeContent.ShowAction()]
      }
    ])
  })
})
