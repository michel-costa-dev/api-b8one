// criando a classe de erro estendendo a classe de erro nativa do javascript
class NaoEncontrado extends Error {
    constructor () {
        super ('Registro não encontrado.')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado