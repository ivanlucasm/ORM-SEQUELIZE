const database = require('../models')

class PessoaController{
    static async listarPessoas (req, res){
        try{
            const pessoasResultado = await database.Pessoas.findAll();

            return res.status(200).json(pessoasResultado);
        }catch(error){
            return res.status(500).json(error.message)
        }
        
    }
}

module.exports = PessoaController;