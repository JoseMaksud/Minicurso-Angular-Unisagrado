'use strict';
const db = require('../../config/database');

exports.getDocente = async (query) => {
    try {
        const values = [
            query.rows,
            query.first
        ];

        let countVar = 2; // iniciado em 2 pois ja tenho rows e first
        let filters = ``;
        if(Object.keys(query).length !== 0){
            Object.keys(query).forEach(key => {
                if(query[key].length > 0 && key !== 'first' && key !== 'rows'){
                    countVar++
                    switch (key) {
                        case 'nome':
                            filters += ` AND upper(usu_no_usuario) like upper($${countVar})`;
                            values.push(`%${query[key]}%`);
                            break;
                        
                        case 'cpf':
                            filters += ` AND usu_co_cpf like $${countVar}`;
                            values.push(`%${query[key]}%`);
                            break;

                        case 'email':
                            filters += ` AND usu_no_email like $${countVar}`;
                            values.push(`%${query[key]}%`);
                            break;

                        case 'status':
                            filters += ` AND usu_in_status ${query[key] == 'T'? '<>' : '='} $${countVar}`;
                            values.push(query[key]);
                            break;

                        case 'tipo':
                            filters += ` AND usu_in_tipo ${query[key] == 'T'? '<>' : '='} $${countVar}`;
                            values.push(query[key]);
                            break;
                        
                        case 'dt_cadastro':
                            let parsedData = JSON.parse(query[key]);

                            if(parsedData.length > 1 && parsedData[1] == null){
                                filters += ` AND usu_dt_cadastro >= $${countVar}`;
                                values.push(parsedData[0]);
                            }else{
                                filters += ` and usu_dt_cadastro between $${countVar} and $${countVar+1}`;
                                values.push(parsedData[0], parsedData[1]);
                            }
                            break;
                        default:
                            break;
                    }
                }
            })
        }

        let text = `
            SELECT 
                usu_co_usuario,
                usu_no_usuario,
                usu_co_cpf,
                usu_no_email,
                usu_nu_telefone,
                usu_in_status,
                usu_in_tipo,
                usu_dt_nascimento,
                usu_dt_cadastro,
                usu_dt_ultima_alteracao,
                usu_co_usuario_alteracao,
                COUNT(*) OVER () AS total_records
            FROM sys_usuario
            WHERE 1 = 1
            
            ${filters}

            LIMIT $1 OFFSET $2
        `
        const result = await db.query(text, values);
        return result.rows;
    } catch (error) {
        throw error;
    }
}


exports.deleteDocente = async (id, status, idUserAlt) => {
    try {
        const text = `
            UPDATE sys_usuario set usu_in_status = ${status == 'A'? "'I'" :"'A'"},
            usu_co_usuario_alteracao = $2,
            usu_dt_ultima_alteracao = now()
            WHERE usu_co_usuario = $1
        `;
        const values = [id];
        const result = await db.query(text, values);
        return result;
    } catch (error) {
        throw error;
    }
}

exports.postDocente = async (docente, idUserCadstro) => {
    try {
        const text = `
            INSERT INTO sys_usuario (
                usu_co_usuario,
                usu_no_usuario,
                usu_co_cpf,
                usu_no_email,
                usu_nu_telefone,
                usu_in_status,
                usu_in_tipo,
                usu_dt_nascimento,
                usu_dt_cadastro,
                usu_co_usuario_alteracao
            )
            VALUES(
                (SELECT COALESCE(MAX(CAST(usu_co_usuario AS INT)), 0) + 1 FROM sys_usuario),
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            )

            RETURNING usu_co_usuario;
        `;

        const values = [
            docente.usu_no_usuario,
            docente.usu_co_cpf.replace(/[.-]/g, ''), // Remove . e -
            docente.usu_no_email,
            docente.usu_nu_telefone.replace(/[()\-]/g, ''),
            docente.usu_in_status,
            docente.usu_in_tipo,
            docente.usu_dt_nascimento,
            docente.usu_dt_cadastro,
            idUserCadstro
        ]

        const result = await db.query(text, values);
        return result;
    } catch (error) {
        throw error;
    }
}


exports.putDocente = async (id, docente, idUserAlt) => {
    try {
        const text = `
            UPDATE sys_usuario
            SET
                usu_no_usuario = $1,
                usu_no_email = $2,
                usu_nu_telefone = $3,
                usu_in_status = $4,
                usu_in_tipo = $5,
                usu_dt_nascimento = $6,
                usu_dt_cadastro = $7,
                usu_co_usuario_alteracao = $10,
                usu_dt_ultima_alteracao = now()
            WHERE
                usu_co_usuario = $9
                AND usu_co_cpf = $8

        `;

        const values = [
            docente.usu_no_usuario,
            docente.usu_no_email,
            docente.usu_nu_telefone.replace(/[()\-]/g, ''),
            docente.usu_in_status,
            docente.usu_in_tipo,
            docente.usu_dt_nascimento,
            docente.usu_dt_cadastro,
            docente.usu_co_cpf.replace(/[.-]/g, ''),
            id,
            idUserAlt
        ]

        const result = await db.query(text, values);
        return result;
    } catch (error) {
        throw error;
    }
}

exports.getUser = async (id) => {
    try {
        const text = `
            SELECT * FROM sys_usuario WHERE usu_co_usuario = $1
        `
        const values = [id];

        const result = await db.query(text, values);
       
        return result.rows
    } catch (error) {
        throw error;
    }
}