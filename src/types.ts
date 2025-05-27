export type Profile = {
  id: string; // DB ID
  userId: string; // User generated ID (source of truth for uniqueness)
  name: string;
  bio: string;
  color: string;
  avatar: string;
  updatedAt: number;
};
