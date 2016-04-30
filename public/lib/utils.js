module.exports = {
  getParameterByName: function getParameterByName (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  },

  updateQueryString: function updateQueryString (key, value, options) {
    if (!options) options = {}

    let url = options.url || location.href
    let re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi'),
      hash

    hash = url.split('#')
    url = hash[0]
    if (re.test(url)) {
      if (typeof value !== 'undefined' && value !== null) {
        url = url.replace(re, '$1' + key + '=' + value + '$2$3')
      } else {
        url = url.replace(re, '$1$3').replace(/(&|\?)$/, '')
      }
    } else if (typeof value !== 'undefined' && value !== null) {
      let separator = url.indexOf('?') !== -1 ? '&' : '?'
      url = url + separator + key + '=' + value
    }

    if ((typeof options.hash === 'undefined' || options.hash) &&
      typeof hash[1] !== 'undefined' && hash[1] !== null)
      url += '#' + hash[1]
    return url
  }
}
