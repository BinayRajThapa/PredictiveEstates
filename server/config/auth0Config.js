import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: 'http://localhost:8000',
  issuerBaseURL: 'https://dev-j40t3bezcwiyg4pm.us.auth0.com',
  tokenSigningAlg: 'RS256',
});

export default jwtCheck;
