import jwt, { decode } from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const generateToken = (data) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: '24h' });

export const createUserJwt = (user) => {
  const payLoad = {
    email: user.email,
    isAdmin: user.isAdmin || false,
  };

  return generateToken(payLoad);
};

export const validateToken = (token) => {
  try {
    const token = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    return {};
  }
};
