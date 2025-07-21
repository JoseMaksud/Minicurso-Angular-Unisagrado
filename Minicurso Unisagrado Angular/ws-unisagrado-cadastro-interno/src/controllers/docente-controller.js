'use strict';
const repository = require('../repositories/docente-repository');
const auth0Service = require('../services/auth0-service');

exports.getDocente = async (req, res, next) => {
    try {
        const data = await repository.getDocente(req.query);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao buscar Docentes!',
            error: error
        })
    }
}

exports.deleteDocente = async (req, res, next) => {
    try {
        const data = await repository.deleteDocente(req.query.idDocente, req.query.statusDocente, req.auth.sub.split('|')[1]);
        await auth0Service.blockUser(req.query.idDocente, req.query.statusDocente == 'A'? false : true);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao deletar Docente!',
            error: error
        })
    }
}

exports.postDocente = async (req, res, next) => {
    try {
        const data = await repository.postDocente(req.body, req.auth.sub.split('|')[1]);
        req.body.usu_co_usuario = data.rows[0].usu_co_usuario
        await auth0Service.createUser(req.body)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao cadastrar Docente!',
            error: error
        })
    }
}

exports.putDocente = async (req, res, next) => {
    try {
        const data = await repository.putDocente(req.params.id, req.body, req.auth.sub.split('|')[1]);
        if(req.body.usu_in_status == 'I'){
            await auth0Service.blockUser(req.body.usu_co_usuario, true);
        }
        await auth0Service.updateUser(req.body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao cadastrar Docente!',
            error: error
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const data = await repository.getUser(req.auth.sub.split('|')[1]);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao buscar User!',
            error: error
        });
    }
}