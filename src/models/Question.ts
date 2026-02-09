import { Schema, models, model } from "mongoose";

const QuestionSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: 'text' // For searching questions
    },
    content: {
        type: String
    },
    questionImage: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [],
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Question = models.Question || model('Question', QuestionSchema);

export default Question;