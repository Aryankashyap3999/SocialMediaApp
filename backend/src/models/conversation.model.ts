import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IConversation extends Document {
    participants: IUser['_id'][];
    isGroup: boolean;
    groupName?: string;
    groupAvatar?: string;
    lastMessage?: Schema.Types.ObjectId;
    lastMessageAt?: Date;
    unreadCount: Map<string, number>;
    mutedBy: IUser['_id'][];
    pinnedBy: IUser['_id'][];
    typing: IUser['_id'][];
    createdAt: Date;
    updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'At least one participant is required']
    }],
    
    isGroup: {
        type: Boolean,
        default: false
    },
    
    groupName: {
        type: String,
        maxlength: [100, 'Group name cannot exceed 100 characters']
    },
    
    groupAvatar: {
        type: String
    },
    
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },

    lastMessageAt: {
        type: Date,
        default: null
    },

    unreadCount: {
        type: Map,
        of: Number,
        default: new Map()
    },
    
    mutedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    pinnedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    typing: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
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
ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ updatedAt: -1 });

// Validation: Groups must have groupName
ConversationSchema.pre('save', async function() {
    if (this.isGroup && !this.groupName) {
        throw new Error('Group conversations must have a group name');
    }
});

const ConversationModel = model<IConversation>('Conversation', ConversationSchema);

export { ConversationModel as Conversation };
export default ConversationModel;
