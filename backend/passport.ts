import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User, { IUser } from './models/User.ts'
import { NextFunction, Request, Response } from 'express';
import { serverErrorLogger } from './loggers.ts';

const secretOrKey = process.env.SECRET_OR_KEY!;

export const loginUser = async function(user: IUser) {
  const userInfo = {
    _id: user._id,
    username: user.username,
    email: user.email
  };
  const token = await jwt.sign(
    userInfo, // payload
    secretOrKey, // sign with secret key
    { expiresIn: 3600 } // tell the key to expire in one hour
  );
  return {
    user: userInfo,
    token
  };
};

passport.use(new LocalStrategy({
  session: false,
  usernameField: 'email',
  passwordField: 'password',
}, async function (email, password, done) {
  const user = await User.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) done(null, false);
      else done(null, user);
    });
  } else
    done(null, false);
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey,
}, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) {
      // return the user to the frontend
      return done(null, user);
    }
    // return false since there is no user
    return done(null, false);
  }
  catch(err) {
    done(err);
  }
}));

export const requireUser = passport.authenticate('jwt', { session: false });

export const restoreUser = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate('jwt', { session: false }, function(err: any, user: IUser) {
    serverErrorLogger('error restoring user:', err);
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};
