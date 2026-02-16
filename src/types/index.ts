export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  stat?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}
