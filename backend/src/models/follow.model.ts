import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IFollow extends Document {
    follower: IUser['_id'];
    following: IUser['_id'];
    createdAt: Date;
}

const FollowSchema = new Schema<IFollow>({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Follower is required']
    },
    
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Following is required']
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

// Ensure a user can only follow another user once
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

// Prevent self-following
FollowSchema.pre('save', async function() {
    if (this.follower.equals(this.following)) {
        throw new Error('Users cannot follow themselves');
    }
});

const FollowModel = model<IFollow>('Follow', FollowSchema);

export { FollowModel as Follow };
export default FollowModel;
