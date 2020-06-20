'use strict'

const Validator = use('Validator')

const maxThreeItens = async (data, field, message) => {
  const ingredients = data.i.split(',')
  if (ingredients.length > 3) {
    throw message
  }
}

Validator.extend('maxThreeItens', maxThreeItens)

class Recipe {
  async fails (error) {
    return this.ctx.response.status(400).send({ error: { message: error[0].message, name: 'IncorretParams', status: 400 } })
  }

  get rules () {
    return {
      i: 'required|maxThreeItens'
    }
  }

  get messages () {
    return {
      'i.required': 'Please enter an ingredient',
      'i.maxThreeItens': 'Maximum three ingredients allowed'
    }
  }
}

module.exports = Recipe
