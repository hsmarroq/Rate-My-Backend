import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import { UnauthorizedError } from '../utils/errors.js';

// create a function to extract the JWT from the request header
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    // Authoriztaion: "Bearer gajkhskgksnjsk""
    const [scheme, token] = headers.authorization.split(' ');
    if (scheme.trim() === 'Bearer') {
      return token;
    }
  }

  return undefined;
};

// create a function to attach the user to the res object
export const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (error) {
    return next();
  }
};

// create a function to verify a authed user exists
export const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
