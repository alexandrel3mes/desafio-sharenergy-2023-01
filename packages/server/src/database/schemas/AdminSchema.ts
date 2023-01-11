import { Schema, model } from 'mongoose';
import IAdmin from './interfaces/IAdmin';

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, minlength: 3, maxlength: 100 },
  password: { type: String, required: true, minlength: 8 },
});

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;
