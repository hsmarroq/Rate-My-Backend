import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import { UnauthorizedError } from '../utils/errors.js';

const jwtFrom = ({ headers }) => {
  if (headers && headers.authorization) {
    const [scheme, token] = headers.authorization.split(' ');
    if (scheme === 'Bearer') {
      return token;
    }
  }
  return undefined;
};

const extractUserFromJWT = (req, res, next) => {
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

const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    if (!user) {
      throw new UnauthorizedError('Unauthorized');
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export { extractUserFromJWT, requireAuthenticatedUser };
