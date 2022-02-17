// encapsulando os métodos do Sequelize
// retornando o Modelo que é uma instância do sequelize

const Modelo = require('./ModelTableFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir (registro) {
        return Modelo.create(registro)
    },
    async pegarPorId (id) {
        const registro = await Modelo.findOne({
            where: { 
                id: id 
            }
        })

        if ( ! registro) {
            throw new NaoEncontrado()
        }

        return registro
    },
    async atualizar (id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    },
    remover (id) {
        return Modelo.destroy({
            where: {id: id}
        })
    }
}