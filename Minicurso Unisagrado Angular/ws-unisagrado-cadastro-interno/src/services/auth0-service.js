var ManagementClient = require('auth0').ManagementClient;
require("dotenv").config();
const axios = require("axios").default;


const auth0 = new ManagementClient({
    domain: process.env.DOMAIN,
    clientId: process.env.CLIENTIDM,
    clientSecret: process.env.CLIENTSECRET, // secret do M2M
    audience: process.env.AUDIENCEM // para fazer o management precisa da audience da api management, para o app e decode do token crie outra api
})

const createUser = async (user) => {
    try {
        const senha = 'SenhaUSCCadrastosA@1';
        await auth0.users.create({
            user_id: `${user.usu_co_usuario}`,
            name: `${user.usu_no_usuario}`,
            email: `${user.usu_no_email}`,
            password: senha,
            connection: 'Username-Password-Authentication'
        });
        return senha;
    } catch (err) {
        throw err;
    }
};

const updateUser = async (user) => {
    try {
        const data = {
            name: user.usu_no_usuario,
            email: user.usu_no_email,
            "blocked": user.usu_in_status == false? true: false
        }
        const params = {
            id: `auth0|${user.usu_co_usuario}`
        }
        const update = await auth0.users.update(params, data);
        return;
    } catch (error) {
        throw error
    }
}

const blockUser = async (user, block) => {
    try {
        const data = {
            "blocked": block 
        }
        const params = {
            id: `auth0|${user}`
        }
        const update = await auth0.users.update(params, data);
        return
    } catch (error) {
        throw error
    }
}

module.exports ={
    createUser,
    updateUser,
    blockUser
}


//https://auth0.github.io/node-auth0/ManagementClient.html