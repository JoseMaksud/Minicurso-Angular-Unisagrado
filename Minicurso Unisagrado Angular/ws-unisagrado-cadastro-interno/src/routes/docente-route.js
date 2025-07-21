'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/docente-controller.js');

router.get('', controller.getDocente);
router.delete('', controller.deleteDocente);
router.post('', controller.postDocente);
router.put('/:id', controller.putDocente);
router.get('/user', controller.getUser);
module.exports = router