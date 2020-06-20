'use strict'

const Env = use('Env')
const axios = require('axios')

class RecipePuppyApi {
  constructor (Config) {
    this.Config = Config
  }

  async getRecipes (ingredients) {
    try {
      const { data } = await axios.get(`${Env.get('API_RECIPE_PUPPY_URL')}?i=${ingredients}`)
      return data
    } catch (error) {
      throw new Error({
        message: 'The Recipe Puppy API is not currently available',
        name: 'Unavailable Service',
        status: 400
      })
    }
  }
}

module.exports = RecipePuppyApi
