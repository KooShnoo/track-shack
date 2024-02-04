import express from "express";
import { Error } from 'mongoose';
import TrackPost, { ITrackPost, tpResponse, tpResponseForUpload } from "../../models/TrackPost.ts";
import { serverErrorLogger } from "../../loggers.ts";
import { restoreUser } from "../../passport.ts";
import { PostTrackPostErrors, noticePostTrackPostNoUser, noticeDeleteTrackPostNoUser } from "../../validations/errors.ts";
import { deleteReplyHandler, postReplyHandler } from "./trackPostReply.ts";
import TrackPostReply from "../../models/TrackPostReply.ts";

const router = express.Router();


router.get('/', async (req, res, next) => {
  const tps = await TrackPost.find().populate('author').populate('responses').populate('comments'); //.populate([{
  //   path: 'comments',
  //   populate: {path: 'author'}
  // }, {path: 'responses'}]);
  await Promise.all(tps.map(tp => tpResponse(tp, true)));
  // mapping of trackpost ids to trackposts
  const tpMap = tps.reduce((acc: Record<number, ITrackPost>, tp) => {
    acc[tp.id] = tp;
    return acc;
  }, {});
  res.json(tpMap);
});


router.get('/:trackId', async (req, res, next) => {
  try {
    const tp = await TrackPost.findById(req.params.trackId).populate([{
      path: 'comments',
      populate: {path: 'author'}
    }, {path: 'responses'}]);
    if (!tp) return res.status(404).json({error: "no such track post"});
    await tpResponse(tp, true);
    return res.json(tp);
  } catch {
    return res.status(404).json({error: "no such track post"});
  }
});


router.post('/', restoreUser, async (req, res, next) => {
  if (!req.user){
    const errors: PostTrackPostErrors = {session: noticePostTrackPostNoUser};
    return res.status(401).json(errors);
  } 
  const tp = new TrackPost({...req.body, author: req.user});
  try {
    await tp.save();
  } catch(err) {
    if (err instanceof Error.ValidationError) {
      serverErrorLogger('invalid');
    }
    return res.status(422).json(err);
  }
  const response = await tpResponseForUpload(tp);
  res.status(201).json(response);
});

router.delete('/:trackId', restoreUser, async (req, res, next) => {
  if (!req.user){
    const errors = {session: noticeDeleteTrackPostNoUser};
    return res.status(401).json(errors);
  } 
  try {
    const tp = await TrackPost.findByIdAndDelete(req.params.trackId);
    if (!tp) {
      return res.status(404).json({error: `Cannot find trackPost ${req.params.trackId}`});
    }
  } catch(err) {
    return res.status(422).json(err);
  }
});

router.post('/:replyId/reply', restoreUser, postReplyHandler);

router.delete('/:replyId/reply', restoreUser, deleteReplyHandler);

export {router as trackPostRouter};