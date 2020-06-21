'use strict'

const { test, trait } = use('Test/Suite')('Recipes')
const Env = use('Env')
trait('Test/ApiClient')
const RecipeController = new (use('App/Controllers/Http/RecipeController'))

test('function getGif return url gif', async ({ assert }) => {
  const title = Env.get('TITLE_GIF')
  const gif = await RecipeController.getGif(title)
  assert.isNotNull(gif)
  assert.isString(gif)
}).timeout(5000)

test('function formatIngredients return array', async ({ assert }) => {
  const ingredients = Env.get('LIST_INGREDIENTS')
  const listIngredients = await RecipeController.formatIngredients(ingredients)
  assert.isArray(listIngredients)
}).timeout(5000)

test('Request return structure is correct', async ({ assert, client }) => {
  const ingredients = { i: Env.get('LIST_INGREDIENTS')}
  const { body } = await client.get('/recipes').send(ingredients).end()
  assert.containsAllKeys(body, ['keywords', 'recipes'])
  assert.isArray(body.recipes)
  if (body.recipes.length > 0) {
    assert.containsAllKeys(body.recipes[0], ['title', 'ingredients', 'link', 'gif'])
  }
}).timeout(50000)
