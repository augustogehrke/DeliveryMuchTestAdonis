const { ServiceProvider } = require('@adonisjs/fold')

class RecipePuppyApi extends ServiceProvider {
  register () {
    this.app.singleton('Services/RecipePuppyApi', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}

module.exports = RecipePuppyApi
