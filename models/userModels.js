import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notification:{
        type: Array,
        default: [],
    },
    seenNotification: {
        type: Array,
        default: [],
    }
})

const userModel = mongoose.model('users', userSchema);

export default userModel;