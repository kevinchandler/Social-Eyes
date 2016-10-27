'use strict'

module.exports = {

  userLookup: (username) => {
    return {
      twitter: `@${username} Twitter`,
      reddit: `/u/${username}`,
      instagram: `@${username} Instagram`
    }
  }

}
