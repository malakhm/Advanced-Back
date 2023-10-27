
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'companies',
    },
  ],
}, { timestamps: true });

export default model('categories', categoriesSchema);
