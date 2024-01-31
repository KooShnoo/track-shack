import mongoose, { model } from 'mongoose'


const replySchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true 
    },
    body: {
        type: String, 
        maxlength: 500,
        required: true 
    }
})

const Reply = mongoose.model("Reply", replySchema)


const commentSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true 
    },
   authorId: {
        type: mongoose.Schema.Types.ObjectId, // Change to ObjectId for relational key
        ref: 'User', // Reference to the User model, replace with your actual model name
        required: true 
    },
    trackPostId: {
        type: mongoose.Schema.Types.ObjectId, // Change to ObjectId for relational key
        ref: 'TrackPost', // Reference to the TrackPost model, replace with your actual model name
        required: true 
    },
    body: {
        type: String, 
        required: true,
        maxlength: 500 
    },
    replies: {type: [Reply], default: []}

}, {timestamps: true }); 

module.exports = mongoose.model("Comment", commentSchema)

