import { connect } from 'mongoose';
import 'dotenv/config';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ShareMongo';

const connectToDatabase = () => connect(uri);

export default connectToDatabase;
