export interface Post {
  identifier: string;
  title: string;
  slug: string;
  subName: string;
  createdAt: string;
  body?: string;
  updatedAt: string;
  username: string;
  //Virtual Fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}
