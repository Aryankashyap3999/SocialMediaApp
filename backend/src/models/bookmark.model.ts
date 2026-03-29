import { Document, model, Schema } from 'mongoose';
import { IUser } from './user.model';
import { IPost } from './post.model';

export interface IBookmark extends Document {
    user: IUser['_id'];
    post: IPost['_id'];
    createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
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

BookmarkSchema.index({ user: 1, createdAt: -1 });
BookmarkSchema.index({ user: 1, post: 1 }, { unique: true });

const BookmarkModel = model<IBookmark>('Bookmark', BookmarkSchema);
export { BookmarkModel as Bookmark };
export default BookmarkModel;
