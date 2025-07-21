export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  synopsis: string;
  content: string;
  featuredImg?: string;
  authorId: number;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user: {
    userId: number;
    username: string;
  };
}
