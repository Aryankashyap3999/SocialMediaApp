import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";
import { IPost } from "./post.model";

export interface IComment extends Document {
    post: IPost['_id'];
    user: IUser['_id'];
    content: string;
    parentComment?: IComment['_id'];
    likes: number;
    replies: number;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post is required']
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    
    content: {
        type: String,
        required: [true, 'Content is required'],
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    
    replies: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_, record: any) => {
            delete record.__v;
            record.id = record._id;
            delete record._id;
            return record;
        }
    }
});

// Indexes for better query performance
CommentSchema.index({ post: 1, createdAt: -1 });
CommentSchema.index({ parentComment: 1, createdAt: -1 });
CommentSchema.index({ user: 1 });

const CommentModel = model<IComment>('Comment', CommentSchema);

export { CommentModel as Comment };
export default CommentModel;
