const { Router } = require('express');
const pessoaController = require('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas', pessoaController.listarPessoas);
router.get('/pessoas/:id', pessoaController.buscarPorId);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', pessoaController.pegaUmaMatricula);
router.post('/pessoas/', pessoaController.create);
router.post('/pessoas/:estudanteId/matricula', pessoaController.createMatricula);
router.put('/pessoas/:id', pessoaController.update);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', pessoaController.atualizaMatricula);
router.delete('/pessoas/:id', pessoaController.delete);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId',pessoaController.deletarMatricula)


module.exports = router