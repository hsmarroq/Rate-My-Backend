import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import { UnauthorizedError } from '../utils/errors.js';

// Create a function to extract the JWT from the request header
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    // Authorization: "Bearer gajkhskgksnjsk"
    const [scheme, token] = headers.authorization.split(' ');
    if (scheme.trim() === 'Bearer') {
      return token;
    }
  }
  return undefined;
};

// Create a function to attach the user to the res object
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

// Create a function to verify an authenticated user exists
const requireAuthenticatedUser = (req, res, next) => {
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

// Export functions as named exports
export { extractUserFromJWT, requireAuthenticatedUser };
