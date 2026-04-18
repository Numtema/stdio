export type Resource = {
  id: string;
  name: string;
  url: string;
};

export type AuthorProfile = {
  name: string;
  role: string;
  bio: string;
  socialLinks: { label: string; url: string }[];
};

export type Lesson = {
  id: number;
  title: string;
  summary: string;
  youtubeUrl: string;
  duration: string;
  resources: Resource[];
  links: { label: string; url: string }[];
  comments: string[];
};
