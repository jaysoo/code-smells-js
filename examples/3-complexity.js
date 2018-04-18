/*
  * @flow
 * Here's an example of checking if user-agent is a bot.
 *
 * There are two versions, isBotA (which is complex), isBotB (which is simpler).
 */

function isBotA(userAgent: string) {
  // Ignore all the user agents we don't care about
  if (userAgent.indexOf('Pulsepoint') !== -1) return true
  if (userAgent.indexOf('CloudFlare') !== -1) return true
  if (userAgent.indexOf('Phantom') !== -1) return true
  if (userAgent.indexOf('Android 4') !== -1) return true
  if (userAgent.indexOf('Android 5') !== -1) return true
  if (userAgent.indexOf('Googlebot') !== -1) return true
  if (userAgent.indexOf('AdsBot-Google') !== -1) return true
  if (userAgent.indexOf('Linux') !== -1) return true
  if (userAgent.indexOf('Chrome/3') !== -1) return true
  if (userAgent.indexOf('Bingbot') !== -1) return true
  if (userAgent.indexOf('facebookexternalhit') !== -1) return true
  if (userAgent.indexOf('facebot') !== -1) return true
  if (userAgent.indexOf('python') !== -1) return true
  if (userAgent.indexOf('ia_archiver') !== -1) return true
  return false
}

const BOTS = [
  'Pulsepoint', 'CloudFlare', 'Phantom', 'Android 4', 'Android 5', 'Googlebot', 'AdsBot-',
  'Linux', 'Chrome/', 'Bingbot', 'facebookexternalhit', 'facebot', 'python', 'ia_archiver'
]

function isBotB(userAgent: string) {
  return BOTS.includes(userAgent)
}
