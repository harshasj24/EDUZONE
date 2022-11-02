export class Teacher {
  id: number;
  name: String;
  lastName: String;
  email: String;
  contact: number;
  address: String;
  role: string;
  userName: string;
  qualification: string;
  courses: string;
}

export interface TeacherGallery {
  name: string;
  url: string;
  type: string;
  size: number;
  courseName: string | null;
}
