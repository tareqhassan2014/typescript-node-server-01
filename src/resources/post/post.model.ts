import { model, Schema } from 'mongoose';
import IPost from './post.interface';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default model<IPost>('Post', PostSchema);
