import Post from './post.interface';
import postModel from './post.model';

class PostService {
  private PostModel = postModel;

  public async create(title: string, body: string): Promise<Post> {
    try {
      const post = this.PostModel.create({ title, body });
      return post;
    } catch (error) {
      throw new Error('Unable to create post');
    }
  }
}

export default PostService;
