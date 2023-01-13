import { Model, Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import IAdmin from './schemas/interfaces/IAdmin';

class CheckforAdminAndDump {
  private schema: Schema;

  private model: Model<IAdmin>;

  constructor() {
    this.schema = new Schema<IAdmin>({
      username: { type: String, required: true, minlength: 3, maxlength: 100 },
      password: { type: String, required: true, minlength: 8 },
    });
    this.model = models.Admin || model('Admin', this.schema);
  }

  private async createAdmin(): Promise<void> {
    await this.model.create({
      username: 'desafiosharenergy',
      password: bcrypt.hashSync('sh@r3n3rgy', 10),
    });
  }

  public async checkForAdmin(): Promise<void> {
    const admin = await this.model.findOne({ username: 'desafiosharenergy' });
    if (!admin) await this.createAdmin();
  }
}

export default CheckforAdminAndDump;
