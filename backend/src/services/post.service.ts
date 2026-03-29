import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../models/post.model';
import { NotFoundError, ForbiddenError } from '../utils/errors/app.error';

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(postData: Partial<IPost>): Promise<IPost> {
    return await this.postRepository.create(postData);
  }

  async getPostById(postId: string): Promise<IPost> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return post;
  }

  async getPostsByAuthor(authorId: string, limit?: number, skip?: number): Promise<IPost[]> {
    return await this.postRepository.findByAuthor(authorId, limit, skip);
  }

  async getFeed(limit?: number, skip?: number): Promise<IPost[]> {
    return await this.postRepository.findFeed(limit, skip);
  }

  async updatePost(postId: string, userId: string, updateData: Partial<IPost>): Promise<IPost> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    if (post.author.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to update this post');
    }
    const updatedPost = await this.postRepository.updateById(postId, updateData);
    if (!updatedPost) {
      throw new NotFoundError('Post not found');
    }
    return updatedPost;
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    if (post.author.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to delete this post');
    }
    await this.postRepository.deleteById(postId);
  }
}
