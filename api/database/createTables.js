const ModelTable = require('../router/fornecedores/ModelTableFornecedor')

// sincronizando as configurações
ModelTable
    .sync()
    .then(() => console.log('Tabela criada com sucesso.'))
    .catch(console.log)