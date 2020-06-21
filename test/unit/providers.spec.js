'use strict'

const { test } = use('Test/Suite')('Providers')
const RecipePuppyApi = use('Services/RecipePuppyApi')
const GiphyApi = use('Services/GiphyApi')

test('API Recipe Puppy online', async ({ assert }) => {
  const infos = await RecipePuppyApi.getRecipes()
  assert.containsAllKeys(
    infos, ['title', 'version', 'href', 'results']
  )
}).timeout(5000)

test('API Giply online', async ({ assert }) => {
  const { data } = await GiphyApi.searchGif()
  assert.isArray(data)
  assert.isNotEmpty(data)
}).timeout(5000)

