'use strict'

const RecipePuppyApi = use('Services/RecipePuppyApi')

class RecipeController {
  async index ({ request }) {
    const ingredients = request.input('i')
    const data = await RecipePuppyApi.getRecipes(ingredients)
    return data
  }
}

module.exports = RecipeController
