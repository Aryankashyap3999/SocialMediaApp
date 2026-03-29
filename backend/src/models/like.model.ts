import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";
import { IPost } from "./post.model";

export interface ILike extends Document {
    user: IUser['_id'];
    post: IPost['_id'];
    createdAt: Date;
}

const LikeSchema = new Schema<ILike>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post is required']
    }
}, {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
        transform: (_, record: any) => {
            delete record.__v;
            record.id = record._id;
            delete record._id;
            return record;
        }
    }
});

// Ensure a user can only like a post once
LikeSchema.index({ user: 1, post: 1 }, { unique: true });

const LikeModel = model<ILike>('Like', LikeSchema);

export { LikeModel as Like };
export default LikeModel;
