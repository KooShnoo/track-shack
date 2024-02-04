import express from "express";
import { Error } from 'mongoose';
import Comment from '../../models/Comment';
import {noticePostTrackPostNoUser} from '../../validations/errors.ts';
import {restoreUser} from '../../passport.ts';
import TrackPost from "../../models/TrackPost.ts";
import { serverErrorLogger } from "../../loggers.ts";


const router = express.Router();

router.get('/:trackPostId', async (req, res) => {
  try {
    const trackPostId = req.params.trackPostId;
    const comments = await Comment.find({ trackPostId: trackPostId });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/:trackPostId', restoreUser, async (req, res) => {
  if (!req.user){
    const errors = {session: noticePostTrackPostNoUser};
    return res.status(401).json(errors);
  } 
  const comment = new Comment({...req.body, author: req.user});  
  try {
    await comment.save();
    const trackPostId = req.params.trackPostId;
    const trackPost = await TrackPost.findById( trackPostId);
    trackPost.comments.push(comment._id);
    await trackPost.save();
    res.json(comment);
  } catch (error) {
    res.status(422).json(error);
  }

  // res.status(200).json(comment.toObject())
});

router.delete('/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId; 
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    console.log('IN ROUTE RESULT', deletedComment);
    if (deletedComment) {
      // If the comment with the specified ID was not found
      return res.status(200).send('Comment Deleted!');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error When Deleting');
  }
});

export {router as commentsRouter};