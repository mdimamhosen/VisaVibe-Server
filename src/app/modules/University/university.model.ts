import mongoose, { Schema } from 'mongoose';
import { IUniversity } from './university.interface';

const universitySchema = new Schema<IUniversity>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    ranking: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['Public', 'Private'],
    },
    programsOffered: {
      type: [String],
    },
    duration: {
      type: String,
    },
    admissionRequirements: {
      type: [String],
    },
    tuitionFees: {
      type: Number,
    },
    shortDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const University = mongoose.model<IUniversity>('University', universitySchema);
export default University;
