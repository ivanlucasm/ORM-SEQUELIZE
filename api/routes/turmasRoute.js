const { Router } = require('express');
const turmaController = require('../controllers/TurmaController.js');

const router = Router();

router.get('/turmas', turmaController.listarTurma);
router.get('/turmas/:id', turmaController.buscarPorId);
router.post('/turmas', turmaController.criarTurma);
router.put('/turmas/:id', turmaController.editarTurma);
router.delete('/turmas/:id', turmaController.apagarTurma);
router.post('/turmas/:id/restaura', turmaController.restauraTurma);

module.exports = router;