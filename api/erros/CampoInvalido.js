class CampoInvalido extends Error {
    constructor (campo) {
        const mensagem = `Campo '${campo}' inválido`
        super(mensagem)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido