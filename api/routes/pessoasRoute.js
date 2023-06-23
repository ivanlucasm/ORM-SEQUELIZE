const { Router } = require('express');
const pessoaController = require('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas', pessoaController.listarPessoasAtivas);
router.get('/pessoas/all', pessoaController.listarTodasPessoas);
router.get('/pessoas/:id', pessoaController.buscarPorId);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', pessoaController.pegaUmaMatricula);
router.get('/pessoas/:estudanteId/matricula', pessoaController.pegaMatriculas);
router.get('/pessoas/matricula/:turmaId/confirmadas', pessoaController.pegaMatriculasPorTurma);
router.get('/pessoas/matricula/lotada', pessoaController.pegaTurmaLotadas);

router.post('/pessoas/', pessoaController.create);
router.post('/pessoas/:estudanteId/matricula', pessoaController.createMatricula);
router.post('/pessoas/:id/restaura', pessoaController.restauraPessoa);
router.post('/pessoas/:estudanteId/cancela', pessoaController.cancelaPessoa);

router.put('/pessoas/:id', pessoaController.update);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', pessoaController.atualizaMatricula);

router.delete('/pessoas/:id', pessoaController.delete);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId',pessoaController.deletarMatricula);



module.exports = router;