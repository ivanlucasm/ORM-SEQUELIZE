const database = require('../models')

class NivelController{

    static async listarNiveis(req, res){

        try{
            const listaNiveis = await database.Niveis.findAll();
            return res.status(200).json(listaNiveis);
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    static async listarPorId(req, res){
        try{
            const { id } = req.params;
            const resultadoNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(resultadoNivel)
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    static async criarNivel(req, res){
        const nivel = req.body;

        try{
            const nivelCriado = await database.Niveis.create(nivel);
            return res.status(200).json(nivelCriado);
        }catch(error){
            return res.status(500).send(error.message)
        }
    }

    static async apagarNivel(req, res){

        try{
            const { id } = req.params;

            const nivelApagado = await database.Niveis.destroy({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).send({message: `Nivel do id ${id} apagado com sucesso. `})
        }catch(error){
            return res.status(500).send(error.message)
        }
    }

    static async editarNivel(req, res){
        try{
            const { id } = req.params;
            const nivel  = req.body;

            await database.Niveis.update(nivel, {
                where: {
                    id: Number(id)
                }
            });

            const nivelEditado = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json(nivelEditado);

        }catch(error){
            return res.status(500).send(error.message);
        }
    }

}

module.exports = NivelController;