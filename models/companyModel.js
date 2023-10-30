
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const companiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  website_link: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  categories:[
    {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      require:true
    },
  ],
}, { timestamps: true });

companiesSchema.pre('find', function(next) {
  this.populate('categories');
  next();
});

export default model('companies', companiesSchema);
