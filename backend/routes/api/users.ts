import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User, { IUser } from '../../models/User.ts'
import passport from 'passport';
import { loginUser, restoreUser } from '../../passport.ts'

import { validateRegisterInput } from '../../validations/register.ts';
import { validateLoginInput } from '../../validations/login.ts';

const isProduction = process.env.NODE_ENV === 'production';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('GET /api/users');
});

// POST /api/users/register
router.post('/register', validateRegisterInput, async (req: Request, res: Response, next: NextFunction) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err: Error & {statusCode?: number} = new Error("Validation Error");
    err.statusCode = 400;
    const errors: any = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    // err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });
  if (!req.body.password) {
    next("no password provided");
    return;
  };

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// POST /api/users/login
router.post('/login', validateLoginInput, async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async function(err: any, user: any) {
    if (err) return next(err);
    if (!user) {
      const err: any = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});


declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
});


export default router;
