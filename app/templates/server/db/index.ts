import path from 'path';
import mongoose from 'mongoose';
import glob from 'glob';

const initSchemas = () => {
  glob.sync(path.resolve(__dirname, './schemas/', '**/*.schema.ts')).forEach(schema => import(schema));
};

const connectMongoDB = async () => {

  initSchemas();

  const options = {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.set('debug', process.env.DEBUG);

  try {
    await mongoose.connect(process.env.MONGODB_URL, options);
  } catch (error) {
    console.log('MongoDB database connect failed');
    console.error(error);
  }

  mongoose.connection.on('error', error => {
    console.log('connect MongoDB database error');
    console.error(error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('disconnected MongoDB');
  });
};

export default connectMongoDB;
