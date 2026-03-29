import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export enum NotificationType {
    LIKE = 'like',
    COMMENT = 'comment',
    FOLLOW = 'follow',
    MENTION = 'mention',
    MESSAGE = 'message',
    REPLY = 'reply'
}

export interface INotification extends Document {
    recipient: IUser['_id'];
    sender: IUser['_id'];
    type: 'like' | 'comment' | 'follow' | 'mention' | 'message' | 'reply';
    post?: string;
    targetId?: string;
    targetType?: 'post' | 'comment' | 'story';
    content?: string;
    isRead: boolean;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recipient is required']
    },
    
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required']
    },
    
    type: {
        type: String,
        enum: ['like', 'comment', 'follow', 'mention', 'message', 'reply'],
        required: [true, 'Notification type is required']
    },
    
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    
    targetId: {
        type: String
    },
    
    targetType: {
        type: String,
        enum: ['post', 'comment', 'story']
    },
    
    content: {
        type: String,
        maxlength: [500, 'Content cannot exceed 500 characters']
    },
    
    isRead: {
        type: Boolean,
        default: false
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

// Indexes for better query performance
NotificationSchema.index({ recipient: 1, createdAt: -1 });
NotificationSchema.index({ recipient: 1, isRead: 1 });

const NotificationModel = model<INotification>('Notification', NotificationSchema);

export { NotificationModel as Notification };
export default NotificationModel;
