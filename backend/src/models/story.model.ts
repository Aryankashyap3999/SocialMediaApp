import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IStory extends Document {
    user: IUser['_id'];
    media: {
        type: 'image' | 'video';
        url: string;
        duration?: number;
    };
    signalTier: 'pulse' | 'flash' | 'broadcast';
    viewers: IUser['_id'][];
    isLive: boolean;
    caption?: string;
    expiresAt: Date;
    createdAt: Date;
}

const StorySchema = new Schema<IStory>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    
    media: {
        type: {
            type: String,
            enum: ['image', 'video'],
            required: [true, 'Media type is required']
        },
        url: {
            type: String,
            required: [true, 'Media URL is required']
        },
        duration: {
            type: Number,
            min: 0
        }
    },
    
    signalTier: {
        type: String,
        enum: ['pulse', 'flash', 'broadcast'],
        default: 'pulse'
    },
    
    viewers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    isLive: {
        type: Boolean,
        default: false
    },
    
    caption: {
        type: String,
        maxlength: [500, 'Caption cannot exceed 500 characters']
    },
    
    expiresAt: {
        type: Date,
        required: [true, 'Expiration date is required']
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
StorySchema.index({ user: 1, expiresAt: 1 });
StorySchema.index({ expiresAt: 1 });

// Set default expiration to 24 hours from now
StorySchema.pre('save', async function() {
    if (this.isNew && !this.expiresAt) {
        this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
});

const StoryModel = model<IStory>('Story', StorySchema);

export { StoryModel as Story };
export default StoryModel;
