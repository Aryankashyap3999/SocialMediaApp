import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IPost extends Document {
    author: IUser['_id'];
    content: string;
    language?: string;
    media?: {
        type: 'image' | 'video';
        url: string;
        aspectRatio?: string;
        duration?: string;
    };
    likes: number;
    comments: number;
    shares: number;
    echoCount: number;
    bookmarkCount: number;
    // Echo (repost) fields
    echoOf?: IPost['_id'];
    isEcho: boolean;
    // Signal Boost fields
    boostedUntil?: Date;
    boostTier?: 'pulse' | 'flash' | 'broadcast';
    type: 'post' | 'story' | 'reel' | 'poll' | 'live';
    visibility: 'public' | 'private' | 'followers';
    commentsEnabled: boolean;
    likesVisible: boolean;
    tags: string[];
    mentions: IUser['_id'][];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        maxlength: [5000, 'Content cannot exceed 5000 characters']
    },
    language: {
        type: String,
        default: 'English'
    },
    media: {
        type: {
            type: String,
            enum: ['image', 'video']
        },
        url: String,
        aspectRatio: String,
        duration: String
    },
    likes: { type: Number, default: 0, min: 0 },
    comments: { type: Number, default: 0, min: 0 },
    shares: { type: Number, default: 0, min: 0 },
    echoCount: { type: Number, default: 0, min: 0 },
    bookmarkCount: { type: Number, default: 0, min: 0 },
    echoOf: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    isEcho: { type: Boolean, default: false },
    boostedUntil: { type: Date, default: null },
    boostTier: {
        type: String,
        enum: ['pulse', 'flash', 'broadcast'],
        default: null
    },
    type: {
        type: String,
        enum: ['post', 'story', 'reel', 'poll', 'live'],
        default: 'post'
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'followers'],
        default: 'public'
    },
    commentsEnabled: { type: Boolean, default: true },
    likesVisible: { type: Boolean, default: true },
    tags: [{ type: String, trim: true }],
    mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true,
    toJSON: {
        transform: (_, record: any) => {
            delete record.__v;
            // Compute signal strength on serialization: likes*3 + comments*5 + echoCount*4 + shares*2
            record.signalStrength = Math.min(
                100,
                (record.likes || 0) * 3 +
                (record.comments || 0) * 5 +
                (record.echoCount || 0) * 4 +
                (record.shares || 0) * 2
            );
            // Mark if currently boosted
            record.isBoosted = record.boostedUntil ? new Date(record.boostedUntil) > new Date() : false;
            return record;
        }
    }
});

PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ type: 1, createdAt: -1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ boostedUntil: 1 });

const PostModel = model<IPost>('Post', PostSchema);

export { PostModel as Post };
export default PostModel;
