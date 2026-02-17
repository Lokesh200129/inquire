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
        index: 'text'
    },
    content: {
        type: String
    },
    questionImage: {
        type: [String],
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
}, { timestamps: true });

QuestionSchema.index({ 'upvotes': -1 });

const Question = models.Question || model('Question', QuestionSchema);

export default Question;