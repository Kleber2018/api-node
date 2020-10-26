import { Schema, model } from 'mongoose';

const OcurrenceSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  number: {
    type: Number
  },
  complement: {
    type: String
  },
  neighborhood: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: [true, 'testekkk kk']
  },
  type: {
    type: String,
    required: true
  },
  user_id: {
    type: String
  },
  // user_name: {
  //   type: String
  // },
  ocurred_at: {
    type: Date,
    required: true
  },
  anonymous: {
    type: Boolean,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

export default model('Ocurrence', OcurrenceSchema);
