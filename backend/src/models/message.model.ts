import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IMessage extends Document {
    conversation: Schema.Types.ObjectId;
    sender: IUser['_id'];
    content: string;
    type: 'text' | 'image' | 'audio' | 'file';
    mediaUrl?: string;
    readBy: Map<string, Date>;
    reactions?: string[];
    createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: [true, 'Conversation is required']
    },
    
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required']
    },
    
    content: {
        type: String,
        required: [true, 'Content is required'],
        maxlength: [5000, 'Message cannot exceed 5000 characters']
    },
    
    type: {
        type: String,
        enum: ['text', 'image', 'audio', 'file'],
        default: 'text'
    },
    
    mediaUrl: {
        type: String
    },
    
    readBy: {
        type: Map,
        of: Date,
        default: new Map()
    },
    
    reactions: [{
        type: String
    }]
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
MessageSchema.index({ conversation: 1, createdAt: -1 });
MessageSchema.index({ sender: 1 });

const MessageModel = model<IMessage>('Message', MessageSchema);

export { MessageModel as Message };
export default MessageModel;
