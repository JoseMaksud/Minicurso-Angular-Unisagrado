'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
var { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const index = require('../src/routes/index.js');
const docente = require('../src/routes/docente-route.js');

if (
    !process.env.DOMAIN ||
    !process.env.AUDIENCE
  ) {
  
    console.log(
      "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
    );
  
    process.exit();
  };

  
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.AUDIENCE,
    issuer: `https://${process.env.DOMAIN}/`,
    algorithms: ['RS256']
});


app.use('/', index);
app.use('/docente', checkJwt, docente);

require('dotenv').config()



module.exports = app;
