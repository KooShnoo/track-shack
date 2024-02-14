import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User, { IUser } from '../../models/User.ts';
import passport from 'passport';
import { loginUser, restoreUser } from '../../passport.ts';
import { UserLoginErrors, UserSignUpErrors, noticeBadCredentials, noticeEmailTaken, noticeNoPassword, noticeUsernameTaken } from '../../validations/errors.ts';

import { validateRegisterInput } from '../../validations/register.ts';
import { validateLoginInput } from '../../validations/login.ts';
import { serverLogger } from '../../loggers.ts';
import { ensureUniquePFPFilename, getFileUrl, getUploadUrl } from '../../api_s3.ts';

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

  const errors: UserSignUpErrors = {statusCode: 400};

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    if (user.email === req.body.email) {
      errors.email = noticeEmailTaken;
    }
    if (user.username === req.body.username) {
      errors.username = noticeUsernameTaken;
    }
    // err.errors = errors;
    return next(errors);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });
  if (!req.body.password) {
    errors.password = noticeNoPassword;
    return next(errors);
  }

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
    });
  });
});

// POST /api/users/login
router.post('/login', validateLoginInput, async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async function(err: unknown, user: IUser | false | null | undefined) {
    if (err) return next(err);
    if (!user) {
      const err: UserLoginErrors = {message: noticeBadCredentials};
      err.statusCode = 400;
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if(!user) { return res.status(404).json(user); }
    if (user.pfpSrc) user.pfpSrc = await getFileUrl(user.pfpSrc);
    return res.json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});


export interface pfpResponseForUpload { pfpUploadURL: string }

router.put('/pfp', restoreUser, ensureUniquePFPFilename, async (req, res, next) => {
  try {
    if(!req.user) { return res.status(404).json({error: 'You must be signed in to update your profile photo.'}); }
    const user = await User.findById(req.user.id);
    if(!user) { return res.status(422).json({error: 'You must exist.'});}
    user.pfpSrc = req.body.pfp_filename;
    const pfpUploadURL = await getUploadUrl(req.body.pfp_filename);
    if (!pfpUploadURL) { return res.status(422).json({error: "invalid fileName"}); }
    const res_: pfpResponseForUpload = {pfpUploadURL};
    await user.save();
    return res.json(res_);
  } catch (err) {
    res.status(422).json(err);
  }
});


export default router;
