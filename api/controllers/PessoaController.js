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

    static async buscarPorId(req, res){
        try{
            const { id } = req.params;

            const pessoaResultado = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            });
            
            return res.status(200).json(pessoaResultado);
            
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async create(req, res){
        try{
            let pessoa = req.body;
            
            const pessoaResultado = await database.Pessoas.create(pessoa);

            return res.status(200).json(pessoaResultado)

        }catch(error){
            return res.status(500).send({message: `Não foi possivel adicionar pessoa.  ${error}`});
        }

    }

    static async update(req, res){
        const pessoa = req.body;
        const { id } = req.params

        try{
            await database.Pessoas.update(pessoa, {
                where: {id: Number(id)}
            });

            const pessoaAtualizada = await database.Pessoas.findOne({
                where: { id : Number(id)}
            });

            return res.status(200).json(pessoaAtualizada);
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    static async delete(req, res){
        try{

            const { id } = req.params;

            const pessoaResultado = await database.Pessoas.destroy(
                {where: {id: Number(id)}}
            );

            return res.status(200).send({message: `Pessoa com o ID: ${id} apagado com sucesso. `})
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    static async pegaUmaMatricula(req, res){
        try{
            const { estudanteId, matriculaId } = req.params;

            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            
            return res.status(200).json(umaMatricula);
            
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async createMatricula(req, res){
            const { estudanteId } = req.params;
            const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try{            
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);

        }catch(error){
            return res.status(500).send({message: `Não foi possivel adicionar pessoa.  ${error}`});
        }

    }

    static async atualizaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;

        try{
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });

            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            });

            return res.status(200).json(matriculaAtualizada);
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    static async deletarMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            const pessoaResultado = await database.Matriculas.destroy(
                {where: {
                    id: Number(matriculaId)
                }}
            );

            return res.status(200).send({message: `Matricula com o ID: ${matriculaId} apagado com sucesso. `})
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

}

module.exports = PessoaController;