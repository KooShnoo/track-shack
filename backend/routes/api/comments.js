import express from "express";
import { Error } from 'mongoose';
import Comment from '../../models/Comment'
import TrackPost from "../../models/TrackPost.ts";

app.get('/comments/:trackPostId', async (req, res) => {
    try {
        const trackPostId = req.params.trackPostId;
        const comments = await Comment.find({ trackPostId: trackPostId });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/comments/:trackPostId', async (req, res) => {

    const comment = Comment.new({...req.body})  
    try {
        await comment.save()
        const trackPostId = req.params.trackPostId;
        const trackPost = await trackPost.find({id: trackPostId})
        trackPost.comments.push(comment)
        await trackPost.save()
        res.json(trackPost.comments)
    } catch (error) {
        res.status(422).json(error)
    }
    res.status(200).json(comment.toObject())
});

app.delete('/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId 
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            // If the comment with the specified ID was not found
            return res.status(404).send('Comment not found');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})