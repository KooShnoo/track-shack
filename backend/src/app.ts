import express, { ErrorRequestHandler } from 'express';
import { Error } from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import { serverErrorLogger } from './loggers.ts';
import passport from 'passport';
import usersRouter from './routes/api/users.ts';
import csrfRouter from './routes/api/csrf.ts';
import './passport.ts';
import { trackPostRouter } from './routes/api/trackPosts.ts';
// @ts-expect-error this is a js file
import { commentsRouter } from './routes/api/comments.js';
import omit from 'lodash.omit';
import { ProcessingError } from './validations/errors.ts';

const isProduction = process.env.NODE_ENV === 'production';


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// auth
app.use(passport.initialize());

// Security Middleware
if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:5173). (In production, the Express 
  // server will serve the React files statically.)
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true
    }
  })
);

// routers
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/trackPosts', trackPostRouter);
app.use('/api/comments', commentsRouter);

// unhandled
app.use((req, res, next) => {
  const err: Error = new Error('Not Found');
  res.status(404);
  res.json({
    message: err.message,
    // errors: err.errors
  });
});

// error
app.use(((err: ProcessingError, req, res, next) => {
  serverErrorLogger('err');
  serverErrorLogger(err);
  res.status(err.statusCode || 500);
  res.json(omit(err, 'statusCode'));
}) as ErrorRequestHandler);

export default app;
