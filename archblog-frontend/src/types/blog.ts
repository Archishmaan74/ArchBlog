export interface Blog {
  id: number;
  title: string;
  content: string;
  dateOfBlog: string;
  timeOfBlog: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  gender: string;
  companyName: string;
}

export interface BlogRequest {
  title: string;
  content: string;
}
