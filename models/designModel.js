import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const designSchema = new Schema({
    images: {
        type: [String],
        required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companies',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
}, { timestamps: true });

designSchema.pre('find', function (next) {
  this.populate('companyId').populate('categoryId');
  next();
});


export default model('designs', designSchema);
