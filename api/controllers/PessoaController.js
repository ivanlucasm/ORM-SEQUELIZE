const database = require('../models');
const Sequelize = require('sequelize');

const Services = require('../services/Services.js');
const pessoasServices = new Services('Pessoas');
class PessoaController{
  static async listarPessoasAtivas (req, res){
    try{
      const pessoasAtivas = await pessoasServices.pegaTodosOsRegistros();

      return res.status(200).json(pessoasAtivas);
    }catch(error){
      return res.status(500).json(error.message);
    }
        
  }

  static async listarTodasPessoas (req, res){
    try{
      const resutadoPessoas = await database.Pessoas.scope('todos').findAll();

      return res.status(200).json(resutadoPessoas);
    }catch(error){
      return res.status(500).json(error.message);
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

      return res.status(200).json(pessoaResultado);

    }catch(error){
      return res.status(500).send({message: `Não foi possivel adicionar pessoa.  ${error}`});
    }

  }

  static async update(req, res){
    const pessoa = req.body;
    const { id } = req.params;

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

      await database.Pessoas.destroy(
        {where: {id: Number(id)}}
      );

      return res.status(200).send({message: `Pessoa com o ID: ${id} apagado com sucesso. `});
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
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
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
    const { matriculaId } = req.params;
    try{
      await database.Matriculas.destroy(
        {where: {
          id: Number(matriculaId)
        }}
      );

      return res.status(200).send({message: `Matricula com o ID: ${matriculaId} apagado com sucesso. `});
    }catch(error){
      return res.status(500).send(error.message);
    }
  }

  static async restauraPessoa(req, res){
    const { id } = req.params;

    try{
      await database.Pessoas.restore({where : {id: Number(id)}});
      return res.status(200).json({message: `ID: ${id} restaudado. `});
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatriculas (req, res){
    const { estudanteId } = req.params; 
    try{
      const pessoa = await database.Pessoas.findOne({where: {id: Number(estudanteId)}});

      const matriculas = await pessoa.getAulasMatriculadas();

      return res.status(200).json(matriculas);
    }catch(error){
      return res.status(500).json(error.message);
    }
        
  }

  static async pegaMatriculasPorTurma (req, res){
    const { turmaId } = req.params; 
    try{
      const todasAsMatriculas = await database.Matriculas.findAndCountAll(
        {
          where: {
            turma_id: Number(turmaId),
            status: 'confirmado'
          },
          limit: 20,
          order: [['estudante_id', 'DESC']]
        });

      return res.status(200).json(todasAsMatriculas);

    }catch(error){
      return res.status(500).json(error.message);
    }
        
  }

  static async pegaTurmaLotadas (req, res){
    const  lotacaoTurma = 2; 
    try{
      const turmasLotadas = await database.Matriculas.findAndCountAll(
        {
          where: {
            status: 'confirmado'
          },
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
        }
      );
      
      return res.status(200).json(turmasLotadas);
    }catch(error){
      return res.status(500).json(error.message);
    }
        
  }

  static async cancelaPessoa (req, res){
    const { estudanteId } = req.params; 
    try{
      database.sequelize.transaction(async transacao => {
        await database.Pessoas.update({ativo: false}, { where: { id: Number(estudanteId)}}, {transaction: transacao});
        await database.Matriculas.update({status: 'cancelado'}, {where: {estudante_id: Number(estudanteId)}}, {transaction: transacao});

        return res.status(200).json({message: `Matricuclas ref. estudante ${estudanteId} cancelados. `});
      });
      
    }catch(error){
      return res.status(500).json(error.message);
    }
        
  }

}

module.exports = PessoaController;