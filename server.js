import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config.js';
import { NotFoundError } from './utils/errors.js';
import { extractUserFromJWT } from './middleware/security.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

const app = express();

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors());
// parse incoming requests with JSON payloads
app.use(express.json());
// log requests info
app.use(morgan('tiny'));
// for every request, check if a token exists
// in authorization header
// if it does, attach the decoded user to res.locals
app.use(extractUserFromJWT);

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
