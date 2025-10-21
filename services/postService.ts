import type { Post } from '../types';

const POSTS_KEY = 'blog-posts';
const SIMULATED_DELAY = 500; // 500ms delay

const getPostsFromStorage = (): Post[] => {
  try {
    const storedPosts = localStorage.getItem(POSTS_KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.error("Failed to parse posts from localStorage", error);
    return [];
  }
};

export const getPostsByAuthor = (authorId: string): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPosts = getPostsFromStorage();
      const authorPosts = allPosts
        .filter(post => post.authorId === authorId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      resolve(authorPosts);
    }, SIMULATED_DELAY);
  });
};

export const getPostById = (postId: string): Promise<Post | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPosts = getPostsFromStorage();
      const post = allPosts.find(post => post.id === postId);
      resolve(post);
    }, SIMULATED_DELAY);
  });
};

export const createPost = (title: string, content: string, authorId: string): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPosts = getPostsFromStorage();
      const newPost: Post = {
        id: `post_${Date.now()}`,
        title,
        content,
        authorId,
        createdAt: new Date().toISOString(),
      };
      const updatedPosts = [...allPosts, newPost];
      localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
      resolve(newPost);
    }, SIMULATED_DELAY);
  });
};