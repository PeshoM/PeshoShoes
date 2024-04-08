import { Schema, model, Document } from "mongoose";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

const userSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = model<User>("users", userSchema);