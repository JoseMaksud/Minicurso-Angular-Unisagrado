import config from '../../auth_config.json';


const { domain, clientId, audience, errorPath, authorizationParams } = config as {
    domain: string;
    clientId: string;
    audience?: string;
    errorPath: string;
    authorizationParams: any;
};

export const  environment = {
    production: false,
    API: 'http://localhost:3000',
    APP: 'http://localhost:4200',
    auth0: {
        production: false,
        auth: {
            authorizationParams,
            domain,
            clientId,
            ...(audience && audience !== 'https://unisagrado-cadastro' ? { audience } : null),
            redirectUri: `${window.location.origin}/callback`,
            errorPath,
        },
        httpInterceptor: {
            allowedList: [
                'http://localhost:3000/*'
                // 'http://localhost:3000/docente/cadastro*',
                // 'http://localhost:3000/docente/edit*'
            ],
        },
    },
}
