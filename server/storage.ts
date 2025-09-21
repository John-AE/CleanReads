import {
  users,
  posts,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
  type UpdatePostType,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Post operations
  getPosts(published?: boolean): Promise<(Post & { author: User })[]>;
  getPost(id: string): Promise<(Post & { author: User }) | undefined>;
  getPostsByAuthor(authorId: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, authorId: string, post: UpdatePostType): Promise<Post | undefined>;
  deletePost(id: string, authorId: string): Promise<boolean>;
  publishPost(id: string, authorId: string): Promise<Post | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Post operations
  async getPosts(published?: boolean): Promise<(Post & { author: User })[]> {
    const query = db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        excerpt: posts.excerpt,
        category: posts.category,
        featuredImage: posts.featuredImage,
        authorId: posts.authorId,
        published: posts.published,
        publishedAt: posts.publishedAt,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        author: users,
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt));

    if (published !== undefined) {
      return await query.where(eq(posts.published, published));
    }
    
    return await query;
  }

  async getPost(id: string): Promise<(Post & { author: User }) | undefined> {
    const [result] = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        excerpt: posts.excerpt,
        category: posts.category,
        featuredImage: posts.featuredImage,
        authorId: posts.authorId,
        published: posts.published,
        publishedAt: posts.publishedAt,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        author: users,
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.id, id));
    
    return result;
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.authorId, authorId))
      .orderBy(desc(posts.createdAt));
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async updatePost(id: string, authorId: string, postUpdate: UpdatePostType): Promise<Post | undefined> {
    const [updatedPost] = await db
      .update(posts)
      .set({ ...postUpdate, updatedAt: new Date() })
      .where(and(eq(posts.id, id), eq(posts.authorId, authorId)))
      .returning();
    
    return updatedPost;
  }

  async deletePost(id: string, authorId: string): Promise<boolean> {
    const result = await db
      .delete(posts)
      .where(and(eq(posts.id, id), eq(posts.authorId, authorId)));
    
    return (result.rowCount ?? 0) > 0;
  }

  async publishPost(id: string, authorId: string): Promise<Post | undefined> {
    const [publishedPost] = await db
      .update(posts)
      .set({ 
        published: true, 
        publishedAt: new Date(),
        updatedAt: new Date()
      })
      .where(and(eq(posts.id, id), eq(posts.authorId, authorId)))
      .returning();
    
    return publishedPost;
  }
}

export const storage = new DatabaseStorage();
