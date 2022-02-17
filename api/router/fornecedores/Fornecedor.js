const TableFornecedor = require('./TableFornecedor');
const CampoInvalido = require('../../erros/CampoInvalido');
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos');

class Fornecedor {
    constructor ({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar () {
        this.validar()
        const resultado = await TableFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar () {
        const fornecedor = await TableFornecedor.pegarPorId(this.id)

        this.empresa = fornecedor.empresa
        this.email = fornecedor.empresa
        this.categoria = fornecedor.categoria
        this.dataCriacao = fornecedor.dataCriacao
        this.dataAtualizacao = fornecedor.dataAtualizacao
        this.versao = fornecedor.versao
    }

    async atualizar () {
        await TableFornecedor.pegarPorId(this.id)
        const campos = ['empresa','email', 'categoria']
        const dadosParaAtualizar = {}
        campos.forEach(campo => {
            const valor = this[campo]

            // condicional para validação e preenchimento dos dados
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        });

        // retorna lista com as chaves do objeto
        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TableFornecedor.atualizar(this.id, dadosParaAtualizar)
    }

    remover() {
        return TableFornecedor.remover(this.id)
    }

    validar () {
        const campos = ["empresa", "email", "categoria"]

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)

            }
        });
    }
}

module.exports = Fornecedor