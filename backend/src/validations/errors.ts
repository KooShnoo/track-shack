// base interface for all errors stemming from processing frontend data
export interface ProcessingError {
  statusCode?: number;
}

export const noticeEmailTaken = "A user has already registered with this email";
export const noticeUsernameTaken = "A user has already registered with this username";
export const noticeNoPassword = "No password provided";
export interface UserSignUpErrors extends ProcessingError {
  email?: typeof noticeEmailTaken;
  username?: typeof noticeUsernameTaken;
  password?: typeof noticeNoPassword
}

export const noticeBadCredentials = 'Invalid credentials';
export interface UserLoginErrors extends ProcessingError {
  message?: typeof noticeBadCredentials
}

export const noticePostTrackPostNoUser = "You must be signed in to post a track";
export interface PostTrackPostErrors {
  session?: typeof noticePostTrackPostNoUser
}
