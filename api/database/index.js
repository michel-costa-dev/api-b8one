// exportação de conexão com banco de dados
const Sequelize = require('sequelize');
const config = require('config');

// instância buscando parâmetros de acesso isolados
const instancia = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
);

module.exports = instancia