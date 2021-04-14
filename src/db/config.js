const sqlite3 = require('sqlite3');
const { open } = require('sqlite')  /**{} permite trazer uma unica funcionalidade do pacote sem ter que importar o pacote interio */

/**abrindo a conexao com o banco de dados */

module.exports = () => {
    open({
        filename: './database.sqlite',
        driver: 'sqlite3.Database'  /**executavel do sqlite */
    }); 
}

/**arrow fuction => fala que e uma estrutura de funcao e nao um objeto entre chaves */
/**module exports ativa automaticamente o open */