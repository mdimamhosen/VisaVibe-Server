import mongoose, { Schema } from 'mongoose';
import { ICountry } from './country.interface';

const countrySchema = new Schema<ICountry>(
  {
    cid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    flagUrl: {
      type: String,
    },
    continent: {
      type: String,
    },
    universities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'University',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model<ICountry>('Country', countrySchema);
export default Country;
