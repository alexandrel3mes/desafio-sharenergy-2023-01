import { Schema, model } from 'mongoose';

interface IAdmin {
  username: string;
  password: string;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, minlength: 3, maxlength: 100 },
  password: { type: String, required: true, minlength: 8 },
});

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;
