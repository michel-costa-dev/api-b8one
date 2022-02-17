const express = require('express')
// instanciando express para gerar a aplicação
const app = express()

const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

// aplicando body-parser para trabalhar com Json
app.use(bodyParser.json())

// Middleware intermediando a requisição para validação de contentType
app.use((requisicao, resposta, middlewareType) => {
    let formatoRequisitado = requisicao.header('Accept')

    // verificando requisição sem especificação de formato
    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    if ( ! formatosAceitos.includes(formatoRequisitado)) {
        resposta.status(406) // status de resposta - tipo de valor não suportado
        resposta.end()
        return // bloqueia a continuidade
    }

    // definindo o formato da resposta
    resposta.setHeader('Content-Type', formatoRequisitado)
    middlewareType()
})

// definindo a rota
const roteador = require('./router/fornecedores')
app.use('/api/fornecedores', roteador)

// Middleware no final do arquivo para centralização do tratamento de erros
app.use((erro, requisicao, resposta, middlewareErro) => {

    let status = 500 // erro genérico

    if (erro instanceof NaoEncontrado) {
        status = 404 // status de resposta - não encontrado
    } 

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400 // status de resposta - requisição mal formada / inválida
    } 

    if (erro instanceof ValorNaoSuportado) {
        status = 406 // status de resposta - tipo de valor não suportado
    }

    resposta.status(status)

    resposta.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    );
})

// definindo e ouvindo a porta
app.listen(config.get('api.porta'), () => console.log('API em funcionamento...'))