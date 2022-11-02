import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login, Student } from "src/app/models";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  public getStudentList(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}`);
  }

  public addStudent(student: Student): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add`, student);
  }

  public updateStudent(id: number, student: Student): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add/${id}`, student);
  }

  public deleteStudent(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  public loginStudent(student: Login): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/student/login`, student);
  }
}
