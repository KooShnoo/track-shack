import { Error } from 'mongoose';
import { RequestHandler } from "express";
import TrackPost, { tpResponse, tpResponseForUpload } from "../../models/TrackPost.ts";
import TrackPostReply, { ITrackPostReply } from "../../models/TrackPostReply.ts";
import { serverErrorLogger } from "../../loggers.ts";
import { PostTrackPostErrors, noticePostTrackPostNoUser } from "../../validations/errors.ts";

export const postReplyHandler: RequestHandler = async (req, res, next) => {
  if (!req.user){
    const errors: PostTrackPostErrors = {session: noticePostTrackPostNoUser};
    return res.status(401).json(errors);
  } 
  const reply = new TrackPostReply({...req.body, author: req.user});
  try {
    const tp = await TrackPost.findById(req.params.trackId);
    if (!tp) return res.status(422).json({trackPost: `no track post with id ${req.params.trackId}`});
    tp.responses.push(reply.id);
    await Promise.all([reply.save(), tp.save()]);
  } catch(err) {
    if (err instanceof Error.ValidationError) {
      serverErrorLogger('invalid');
    }
    res.status(422).json(err);
    return;
  }
  const response = await tpResponseForUpload(reply);
  res.status(201).json(response);
};