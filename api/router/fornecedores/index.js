const router = require('express').Router()
const TableFornecedor = require('./TableFornecedor')
const Fornecedor = require('./Fornecedor');

router.get('/', async (requisicao, resposta) => {
    const resultados = await TableFornecedor.listar();
    resposta.status(200);
    resposta.send(
        JSON.stringify(resultados)
    );
})

router.get('/:idFornecedor', async (requisicao, resposta, middlewareErro) => {
    try {
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        resposta.status(200);
        resposta.send(
            JSON.stringify(fornecedor)
        );
    } catch (error) {
        middlewareErro(error)
    }
})

router.put('/:idFornecedor', async (requisicao, resposta, middlewareErro) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body

        // juntando vários objetos em um só com Object.assign
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204) // método express para definição do status 204-sem conteúdo
        resposta.end() // encerrando a requisição
    } catch (error) {
        middlewareErro(error)
    }
})

router.post('/', async (requisicao, resposta, middlewareErro) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201) // método express para definição do status 201-criado
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        middlewareErro(error)
    }
    
})

router.delete('/:idFornecedor', async (requisicao, resposta, middlewareErro) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204) // método express para definição do status 204-sem conteúdo
        resposta.end() // encerrando a requisição
    } catch (error) {
        middlewareErro(error)
    }
})

module.exports = router