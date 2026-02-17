import { Schema, model, models } from "mongoose";

const voteSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voteType: {
        type: String,
        enum: ['UP', 'DOWN'],
        required: true
    }
}, { timestamps: true });

voteSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Vote = models.Vote || model('Vote', voteSchema);

export default Vote;