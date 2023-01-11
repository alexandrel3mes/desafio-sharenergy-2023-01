import { Schema, model } from 'mongoose';
import IClient from './interfaces/IClient';

const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  email: { type: String, required: true, minlength: 8 },
  phone: { type: String, required: true, minlength: 11 },
  cpf: { type: String, required: true, minlength: 11 },
  address: {
    street: { type: String, required: true, minlength: 3 },
    district: { type: String, required: true, minlength: 3 },
    city: { type: String, required: true, minlength: 3 },
    state: { type: String, required: true, minlength: 2, maxlength: 2 },
    country: { type: String, required: true, minlength: 3 },
    zipcode: { type: String, required: true, minlength: 8 },
  },
});

const Client = model<IClient>('Client', ClientSchema);

export default Client;
