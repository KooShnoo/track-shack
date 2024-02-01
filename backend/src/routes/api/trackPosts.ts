import express from "express";
import { Error } from 'mongoose';
import TrackPost, { ITrackPost, tpResponse, tpResponseForUpload } from "../../models/TrackPost.ts";
import { serverErrorLogger } from "../../loggers.ts";
import { restoreUser } from "../../passport.ts";
import { PostTrackPostErrors, noticePostTrackPostNoUser } from "../../validations/errors.ts";
import { postReplyHandler } from "./trackPostReply.ts";

const router = express.Router();


router.get('/', async (req, res, next) => {
  const tps = await TrackPost.find();
  await Promise.all(tps.map(tpResponse));
  // mapping of trackpost ids to trackposts
  const tpMap = tps.reduce( (acc: Record<number, ITrackPost>, tp) => {
    acc[tp.id] = tp;
    return acc;
  }, {});
  res.json(tpMap);
});


router.get('/:trackId', async (req, res, next) => {
  const tp = await TrackPost.findById(req.params.trackId).populate({
    path: 'comments',
    populate: {path: 'author'}
  });
  if (!tp) return res.status(404).json({error: "no such track post"});
  res.json(await tpResponse(tp));
});


router.post('/', restoreUser,  async (req, res, next) => {
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
    res.status(422).json(err);
    return;
  }
  const response = await tpResponseForUpload(tp);
  res.status(201).json(response);
});

router.post('/:trackId/reply', restoreUser, postReplyHandler);

export {router as trackPostRouter};