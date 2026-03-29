import  { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    name: string;
    bio: string
    avatarUrl?: string;
    isVerified: boolean;
    verificationToken?: string;
    verificationTokenExpiry?: number;
    createdAt: Date;
    updatedAt: Date;
};

const UserSchema = new Schema<IUser>({
     username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email format is invalid']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },

    name: {
        type: String,
        maxlength: [100, 'Name cannot exceed 100 characters'],
        default: ''
    },

    avatarUrl: {
        type: String,
        default: ''
    },

    bio: {
        type: String,
        maxlength: [160, 'Bio cannot exceed 160 characters'],
        default: ''
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken: {
        type: String
    },

    verificationTokenExpiry: {
        type: Number
    }
}, { 
        timestamps: true,
        toJSON: {
            transform: (_, record: any) => {
                delete (record as any).__v;
                record.id = record._id;
                delete record._id;
                return record;
            }
        }
    }
);

UserSchema.pre('save', async function() {
    if (!this.isModified("password")) return;
    const SALT = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(this.password, SALT);
    this.password = hashedPassword;
    this.avatarUrl = `https://robohash.org/${this.username}`;
    this.verificationToken = uuidv4().substring(0, 10).toUpperCase();
    this.verificationTokenExpiry = Date.now() + 3600000;
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;