'use strict'

const Env = use('Env')
const axios = require('axios')

class GiphyApi {
  constructor (Config) {
    this.Config = Config
  }

  async searchGif (name) {
    try {
      const { data } = await axios.get(`${Env.get('API_GIPHY_URL')}gifs/search?api_key=${Env.get('API_GIPHY_KEY')}&q=${name}&limit=1`)
      return data
    } catch (error) {
      throw new Error({
        message: 'The Giphy API is not currently available',
        name: 'Unavailable Service',
        status: 400
      })
    }
  }
}

module.exports = GiphyApi
