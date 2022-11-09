import { Teacher } from "./teacher.model";

export class Student {
  id: number;
  name: string;
  qualification: string;
  contact: number;
  email: string;
  address: string;
  userName: string;
  password: string;
  teacher: Teacher[];
  role: string;
}
