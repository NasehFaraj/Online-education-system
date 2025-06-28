import { Schema, model, Document } from 'mongoose';

export interface IStream extends Document {
    streamId: string;
    title: string;
    isActive: boolean;
}

const StreamSchema = new Schema<IStream>({
    streamId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        default: 'new stream',
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export const Stream = model<IStream>('Stream', StreamSchema);