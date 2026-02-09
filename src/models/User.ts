import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bio: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;