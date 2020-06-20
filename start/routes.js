'use strict'

const Route = use('Route')

Route.get('/recipes', 'RecipeController.index').validator('Ingredient')
