'use strict'

const RecipePuppyApi = use('Services/RecipePuppyApi')
const GiphyApi = use('Services/GiphyApi')

class RecipeController {
  async index ({ request }) {
    const params = request.only(['i'])
    const recipes = await this.getRecipes(params)
    return recipes
  }

  async getRecipes (params) {
    const { results } = await RecipePuppyApi.getRecipes(params.i)
    const recipes = await this.formatRecipes(results)

    const keywords = params.i.split(',')
    return { keywords, recipes }
  }

  async formatRecipes (recipes) {
    const listRecipes = []

    for (const recipe of recipes) {
      const gif = await this.getGif(recipe.title)
      const ingredients = await this.formatIngredients(recipe.ingredients)

      listRecipes.push({
        title: recipe.title,
        ingredients,
        link: recipe.href,
        gif
      })
    }

    return listRecipes
  }

  async getGif (title) {
    const { data } = await GiphyApi.searchGif(title)
    if (Array.isArray(data) && data.length > 0) {
      return data[0].images.original.url
    }

    return null
  }

  async formatIngredients (ingredientsText) {
    const ingredientsList = ingredientsText.split(',')
    const ingredients = ingredientsList.map(ingredient => ingredient.trim())
    return ingredients.sort()
  }
}

module.exports = RecipeController
