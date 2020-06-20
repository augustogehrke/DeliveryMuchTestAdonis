const { ServiceProvider } = require('@adonisjs/fold')

class GiphyApi extends ServiceProvider {
  register () {
    this.app.singleton('Services/GiphyApi', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}

module.exports = GiphyApi
