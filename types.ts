export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  Home = 'home',
  About = 'about',
  Ownership = 'ownership',
  Services = 'services',
  Contact = 'contact'
}