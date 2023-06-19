const { Router } = require('express');
const nivelController = require('../controllers/NivelController.js');

const router = Router();

router.get('/niveis', nivelController.listarNiveis);
router.get('/niveis/:id', nivelController.listarPorId);
router.post('/niveis', nivelController.criarNivel);
router.put('/niveis/:id', nivelController.editarNivel);
router.delete('/niveis/:id', nivelController.apagarNivel);

module.exports = router