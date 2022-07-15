export interface User extends CreateUser, DateData {
  id: number;
}

export interface CreateUser {
  email: string;
  password: string;
}

interface DateData {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
