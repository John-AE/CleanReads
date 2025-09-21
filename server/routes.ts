import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertPostSchema, updatePostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware setup - required for Replit Auth integration
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Blog post routes
  app.get('/api/posts', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : 
                       req.query.published === 'false' ? false : undefined;
      const posts = await storage.getPosts(published);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get('/api/posts/:id', async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.get('/api/posts/author/:authorId', isAuthenticated, async (req, res) => {
    try {
      const posts = await storage.getPostsByAuthor(req.params.authorId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching author posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post('/api/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postData = insertPostSchema.parse(req.body);
      
      // Generate excerpt if not provided
      const excerpt = postData.excerpt || 
        postData.content.substring(0, 200).replace(/\s+/g, ' ').trim() + '...';
      
      const post = await storage.createPost({
        ...postData,
        excerpt,
        authorId: userId,
      });
      
      res.status(201).json(post);
    } catch (error: any) {
      console.error("Error creating post:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.put('/api/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postData = updatePostSchema.parse(req.body);
      
      const post = await storage.updatePost(req.params.id, userId, postData);
      if (!post) {
        return res.status(404).json({ message: "Post not found or unauthorized" });
      }
      
      res.json(post);
    } catch (error: any) {
      console.error("Error updating post:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete('/api/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const success = await storage.deletePost(req.params.id, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Post not found or unauthorized" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  app.post('/api/posts/:id/publish', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const post = await storage.publishPost(req.params.id, userId);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found or unauthorized" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error publishing post:", error);
      res.status(500).json({ message: "Failed to publish post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
