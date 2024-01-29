import express, { ErrorRequestHandler } from 'express';
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

// unhandled
app.use((req, res, next) => {
  const err: Error = new Error('Not Found');
  serverErrorLogger(err);
  res.status(404);
  res.json({
    message: err.message,
    // errors: err.errors
  });
});

// error
app.use(((err: Error, req, res, next) => {
  serverErrorLogger(err);
  res.status(500);
  res.json(err);
}) as ErrorRequestHandler);

export default app;
