import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // // companies: [
  // //   {
  // //     type: Schema.Types.ObjectId,
  // //     ref: 'companies',
  // //     require:true

  // //   },
  // ],
}, { timestamps: true });

// categoriesSchema.pre('find', function(next) {
//   this.populate('companies');
//   next();
// });

export default model('categories', categoriesSchema);
