const database = require('../models')

class TurmaController{
    static async listarTurma (req, res){
        try{
            const turmaResultado = await database.Turmas.findAll();

            return res.status(200).json(turmaResultado);
        }catch(error){
            return res.status(500).json(error.message)
        }
        
    }

    static async buscarPorId(req, res){
        try{
            const { id } = req.params;

            const turmaResultado = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            });
            
            return res.status(200).json(turmaResultado);

        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async criarTurma(req, res){
        try{
            let turma = req.body;
            
            const turmaResultado = await database.Turmas.create(turma);

            return res.status(200).json(turmaResultado)

        }catch(error){
            return res.status(500).send({message: `Não foi possivel adicionar turma.  ${error}`});
        }

    }

    static async editarTurma(req, res){
        const turma = req.body;
        const { id } = req.params

        try{
            await database.Turmas.update(turma, {
                where: {id: Number(id)}
            });

            const turmaAtualizada = await database.Turmas.findOne({
                where: { id : Number(id)}
            });

            return res.status(200).json(turmaAtualizada);
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    static async apagarTurma(req, res){
        try{

            const { id } = req.params;

            await database.Turmas.destroy(
                {
                    where: {id: Number(id)}
                }
            );

            return res.status(200).send({message: `Pessoa com o ID: ${id} apagado com sucesso. `})
        }catch(error){
            return res.status(500).send(error.message);
        }
    }
}

module.exports = TurmaController