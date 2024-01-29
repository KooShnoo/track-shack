import express from "express";
import { Error } from 'mongoose';
import TrackPost, { ITrackPost } from "../../models/TrackPost.ts";
import { serverErrorLogger, serverLogger } from "../../loggers.ts";


const router = express.Router();

router.get('/', async (req, res, _next) => {
  const tps = await TrackPost.find();
  // mapping of trackpost ids to trackposts
  const tpMap = tps.reduce((acc: Record<number, ITrackPost>, tp) => {
    acc[tp.id] = tp;
    return acc;
  }, {});
  res.json(tpMap);
});


router.post('/', async (req, res, next) => {
  // TODO fix require_logged_in
  if (!req.user) return res.json('nouser.');
  const userId = req.user._id;
  const tp = new TrackPost({...req.body, author: req.user});
  try {
    await tp.save();
  } catch(err) {
    serverErrorLogger('err');
    serverErrorLogger(err);
    if (err instanceof Error.ValidationError) {
      serverErrorLogger('invalid');
    }
    res.json(err);
  }
});

export {router as trackPostRouter};